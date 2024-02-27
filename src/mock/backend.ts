import Mock from 'better-mock';

Mock.setup({
  timeout: 300
});

Mock.mock(/\/date/, {
  start: 1708531200000,
  end: 1709012299724,
});

Mock.mock(/papers/, (req: {body: string}) => {
  const {category, date}: {
    category: string,
    date: string,
  } = JSON.parse(req.body);
  return [{
    url: 'https://arxiv.org/abs/2402.16835',
    title: `Eight Methods to Evaluate Robust $Unlearning^{Test}$ in LLMs (${category}, ${date})`,
    authors: ['Aengus Lynch', 'Phillip Guo', 'Aidan Ewart', 'Stephen Casper', 'Dylan Hadfield-Menell'],
    abstract: '$\\LaTeX \\textbf{Test}$ Machine $\\mathbb{unlearning}$ can be useful for $ 1 + 1 ≠ 3 $ removing harmful capabilities and memorized text from large language models (LLMs), but there are not yet standardized methods for rigorously evaluating it. In this paper, we first survey techniques and limitations of existing unlearning evaluations. Second, we apply a comprehensive set of tests for the robustness and competitiveness of unlearning in the "Who\'s Harry Potter" (WHP) model from Eldan and Russinovich (2023). While WHP\'s unlearning generalizes well when evaluated with the "Familiarity" metric from Eldan and Russinovich, we find i) higher-than-baseline amounts of knowledge can reliably be extracted, ii) WHP performs on par with the original model on Harry Potter Q&A tasks, iii) it represents latent knowledge comparably to the original model, and iv) there is collateral unlearning in related domains. Overall, our results highlight the importance of comprehensive unlearning evaluation that avoids ad-hoc metrics.',
    rating: [8,8,6,6],
    soundness: [3,3,2,2],
    presentation: [2,2,1,1],
    contribution: [2,3,3,3],
    strengths: '1. CogVLM is provided as an open-source resource.\n2. CogVLM achieves excellent results ona wide range of benchmarks.\n3. The paper mainly focuses on the experimental results.',
    weaknesses: '1. The paper mainly focuses on the experimental results and does not provide in-depth analysis.',
  },
  {
    url: 'https://arxiv.org/abs/2402.16835',
    title: 'Eight Methods to Evaluate Robust Unlearning in LLMs (2)',
    authors: ['Aengus Lynch', 'Phillip Guo', 'Aidan Ewart', 'Stephen Casper', 'Dylan Hadfield-Menell'],
    abstract: 'Machine unlearning can be useful for removing harmful capabilities and memorized text from large language models (LLMs), but there are not yet standardized methods for rigorously evaluating it. In this paper, we first survey techniques and limitations of existing unlearning evaluations. Second, we apply a comprehensive set of tests for the robustness and competitiveness of unlearning in the "Who\'s Harry Potter" (WHP) model from Eldan and Russinovich (2023). While WHP\'s unlearning generalizes well when evaluated with the "Familiarity" metric from Eldan and Russinovich, we find i) higher-than-baseline amounts of knowledge can reliably be extracted, ii) WHP performs on par with the original model on Harry Potter Q&A tasks, iii) it represents latent knowledge comparably to the original model, and iv) there is collateral unlearning in related domains. Overall, our results highlight the importance of comprehensive unlearning evaluation that avoids ad-hoc metrics.',
    rating: [2,2,4,4],
    soundness: [3,3,2,2],
    presentation: [2,2,1,1],
    contribution: [2,3,3,3],
    strengths: '1. CogVLM is provided as an open-source resource.\n2. CogVLM achieves excellent results ona wide range of benchmarks.\n3. The paper mainly focuses on the experimental results.',
    weaknesses: '1. The paper mainly focuses on the experimental results and does not provide in-depth analysis.',
  },
]});
