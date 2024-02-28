import datetime
import os
import json

from flask import Flask, request, jsonify


app = Flask(__name__)
review_path='arxiv/review'


def check_and_update():
    global reviews
    if len(os.listdir(review_path)) > len(reviews):
        for file in os.listdir(review_path):
            if file not in reviews:
                with open(os.path.join(review_path, file), 'r') as f:
                    reviews[file] = json.loads(f.read())
                    print(f"Update {file}")


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

    reviews = [{
        "rating": review["rating"],
        "soundness": review["rating"],
        "presentation": review["rating"],
        "contribution": review["rating"],
        "summary": review["SUMMARIES"],
        "strengths": review["STRENGTHS"],
        "weaknesses": review["WEAKNESSES"],
        "questions": review["QUESTIONS"]
            
    } for review in filtered_review['reviews']]

    paper = {
        "url": filtered_review['info']['URL'],
        "title": filtered_review['info']['Title'],
        "authors": filtered_review['info']['Authors'],
        "abstract": filtered_review['info']['Abstract'],
        "reviews": reviews,
        "ac": {
            "decision": decision,
            "comments": comments
        }
    }

    return paper


# 返回可用的推荐日期范围
@app.route('/date', methods=['GET'])
def get_date_range():
    global reviews
    check_and_update()
    timestamps = []
    for review in reviews.values():
        timestamps.append(review['info']['Timestamp'])
    start = min(timestamps)
    end = max(timestamps)
    return jsonify({"start": start, "end": end})


# 获取指定类别指定日期的推荐论文
@app.route('/paper', methods=['GET'])
def get_paper():
    check_and_update()
    category = request.args.get('category')
    date_str = request.args.get('date')
    # date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    print(category, date_str)

    filtered_reviews = []
    for review in reviews.values():
        submission_time = timestamp_to_date(review['info']['Timestamp'])
        # print(submission_time)
        if f'cs.{category}'.lower() == review['info']['Category'].lower() and submission_time == date_str:
            filtered_reviews.append(review)

    # 在这里，你可以根据 category 和 date 从数据库或其他数据源获取推荐论文
    # 这里只是一个示例，返回一个空的列表
    papers = [convert_format(filtered_review) for filtered_review in filtered_reviews]

    return jsonify(papers)

if __name__ == '__main__':
    global reviews
    reviews = {}
    app.run(port=10728)
