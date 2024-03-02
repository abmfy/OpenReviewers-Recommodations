import datetime
import os
import re
import json
import time

from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

review_path = 'review'


def check_and_update():
    global reviews
    global update_time
    if reviews and time.time() - update_time < 5:
        return
    update_time = time.time()
    if len(os.listdir(review_path)) > len(reviews):
        for file in os.listdir(review_path):
            if file not in reviews:
                try:
                    with open(os.path.join(review_path, file), 'r') as f:
                        reviews[file] = json.loads(f.read())
                        print(f"Update {file}")
                except:
                    print(f'Read {file} error!')


def timestamp_to_date(seconds):
    # 将秒转换为日期时间对象
    date_time = datetime.datetime.fromtimestamp(seconds)
    # 返回日期字符串
    return date_time.strftime('%Y-%m-%d')


def convert_format(filtered_review):

    try:
        decision, comments = filtered_review['decision'].strip().split('. ', maxsplit=1)
    except:
        decision = ''
        comments = filtered_review['decision'].strip()

    reviews = []
    for review in filtered_review['reviews']:
        rating = re.search(r'\d+', review['rating']) or ['5']
        soundness = re.search(r'\d+', review['soundness']) or ['2']
        presentation = re.search(r'\d+', review['presentation']) or ['2']
        contribution = re.search(r'\d+', review['contribution']) or ['2']
        confidence = re.search(r'\d+', review['confidence']) or ['3']
        reviews.append({
            "rating": int(rating[0]),
            "soundness": int(soundness[0]),
            "presentation": int(presentation[0]),
            "contribution": int(contribution[0]),
            "confidence": int(confidence[0]),
            "summary": review["SUMMARIES"],
            "strengths": review["STRENGTHS"],
            "weaknesses": review["WEAKNESSES"],
            "questions": review["QUESTIONS"]
        })

    paper = {
        "url": filtered_review['info']['URL'],
        "title": filtered_review['info']['Title'],
        "authors": filtered_review['info']['Authors'],
        "abstract": filtered_review['info']['Abstract'],
        "reviews": reviews,
        "average_rating": sum([review["rating"] for review in reviews]) / len(reviews),
        "ac": {
            "decision": decision.split(': ')[-1],
            "comments": comments
        }
    }

    return paper


# 返回可用的推荐日期范围
@app.route('/date', methods=['GET'])
@cross_origin()
def get_date_range():
    global reviews
    check_and_update()
    timestamps = []
    for review in reviews.values():
        timestamps.append(review['info']['Timestamp'] * 1000)
    start = min(timestamps)
    end = max(timestamps)
    return jsonify({"start": start, "end": end})


# 返回指定类别指定日期的论文数量
@app.route('/count', methods=['GET'])   
@cross_origin()
def get_count():
    check_and_update()
    category = request.args.get('category')
    date_str = request.args.get('date')
    # date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    print(category, date_str)

    count = 0
    for review in reviews.values():
        submission_time = timestamp_to_date(review['info']['Timestamp'])
        if f'{category}'.lower() == review['info']['Category'].lower().split('.')[-1] and submission_time == date_str:
            count += 1

    return jsonify(count)


# 获取指定类别指定日期的推荐论文
@app.route('/papers', methods=['GET'])
@cross_origin()
def get_paper():
    check_and_update()
    category = request.args.get('category')
    date_str = request.args.get('date')
    # date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    print(category, date_str)

    filtered_reviews = []
    for review in reviews.values():
        submission_time = timestamp_to_date(review['info']['Timestamp'])
        # print(review['info']['Category'].lower(), f'cs.{category}'.lower())
        if f'{category}'.lower() == review['info']['Category'].lower().split('.')[-1] and submission_time == date_str:
            filtered_reviews.append(review)

    # 在这里，你可以根据 category 和 date 从数据库或其他数据源获取推荐论文
    # 这里只是一个示例，返回一个空的列表
    papers = [convert_format(filtered_review) for filtered_review in filtered_reviews]
    sorted_papers = sorted(papers, key=lambda paper: paper['average_rating'], reverse=True)
    
    print(f"paper length: {len(sorted_papers)}")
    
    return jsonify(sorted_papers)

if __name__ == '__main__':
    global reviews
    global update_time
    reviews = {}
    update_time = time.time() - 5
    check_and_update()
    app.run(host='0.0.0.0', port=10728)
