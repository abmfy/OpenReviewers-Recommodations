import Mock from 'better-mock';

Mock.setup({
  timeout: 300
});

Mock.mock(/\/date/, {
  start: 1708531200000,
  end: 1709012299724,
});

Mock.mock(/paper-count/, 233);

Mock.mock(/papers/, () => {
  return [{
    url: 'https://arxiv.org/abs/2402.16835',
    title: `Eight Methods to Evaluate Robust $Unlearning^{Test}$ in LLMs`,
    authors: ['Aengus Lynch', 'Phillip Guo', 'Aidan Ewart', 'Stephen Casper', 'Dylan Hadfield-Menell'],
    abstract: '$\\LaTeX \\textbf{Test}$ Machine $\\mathbb{unlearning}$ can be useful for $ 1 + 1 ≠ 3 $ removing harmful capabilities and memorized text from large language models (LLMs), but there are not yet standardized methods for rigorously evaluating it. In this paper, we first survey techniques and limitations of existing unlearning evaluations. Second, we apply a comprehensive set of tests for the robustness and competitiveness of unlearning in the "Who\'s Harry Potter" (WHP) model from Eldan and Russinovich (2023). While WHP\'s unlearning generalizes well when evaluated with the "Familiarity" metric from Eldan and Russinovich, we find i) higher-than-baseline amounts of knowledge can reliably be extracted, ii) WHP performs on par with the original model on Harry Potter Q&A tasks, iii) it represents latent knowledge comparably to the original model, and iv) there is collateral unlearning in related domains. Overall, our results highlight the importance of comprehensive unlearning evaluation that avoids ad-hoc metrics.',
    reviews: [
      {
        rating: 2,
        soundness: 3,
        presentation: 2,
        contribution: 2,
        summary: 'This paper introduces CogVLM，a powerful open-sourcevisual language foundation model.CogVLM is a visual languagefoundation model. CogVLM is different from the popular shallowalignment method which maps imagefeatures into the input space oflanguage model. CogVLM bridges thegap between the frozen pretrainedlanguage model and image encoder bya trainable visual expert module inthe attention and FFN layers. CogVLM-17B achieves state-of-the-artperformance on 10 classic cross-modal benchmarks. CogVLM-17B surpasses or matches PaLI-X 55B.',
        strengths: '1. CogVLM is provided as an open-source resource.\n2. CogVLM achieves excellent results ona wide range of benchmarks.\n3. The paper mainly focuses on the experimental results.',
        weaknesses: '1. The paper mainly focuses on the experimental results and does not provide in-depth analysis.',
      },
      {
        rating: 2,
        soundness: 3,
        presentation: 2,
        contribution: 3,
        summary: '∂',
        strengths: 'Holy',
        weaknesses: '[MASK]',
      },
      {
        rating: 4,
        soundness: 2,
        presentation: 1,
        contribution: 3,
        summary: '∂',
        strengths: 'Holy',
        weaknesses: '[MASK]',
      },
      {
        rating: 9,
        soundness: 2,
        presentation: 1,
        contribution: 3,
        summary: '∂',
        strengths: 'Holy',
        weaknesses: '[MASK]',
      },
    ],
    ac: {
      decision: 'Reject.',
      comments: 'The paper mainly focuses on the experimental results and does not provide in-depth analysis.',
    },
  },
  {
    url: 'https://arxiv.org/abs/2402.16835',
    title: 'Eight Methods to Evaluate Robust Unlearning in LLMs (2)',
    authors: ['Aengus Lynch', 'Phillip Guo', 'Aidan Ewart', 'Stephen Casper', 'Dylan Hadfield-Menell'],
    abstract: 'Machine unlearning can be useful for removing harmful capabilities and memorized text from large language models (LLMs), but there are not yet standardized methods for rigorously evaluating it. In this paper, we first survey techniques and limitations of existing unlearning evaluations. Second, we apply a comprehensive set of tests for the robustness and competitiveness of unlearning in the "Who\'s Harry Potter" (WHP) model from Eldan and Russinovich (2023). While WHP\'s unlearning generalizes well when evaluated with the "Familiarity" metric from Eldan and Russinovich, we find i) higher-than-baseline amounts of knowledge can reliably be extracted, ii) WHP performs on par with the original model on Harry Potter Q&A tasks, iii) it represents latent knowledge comparably to the original model, and iv) there is collateral unlearning in related domains. Overall, our results highlight the importance of comprehensive unlearning evaluation that avoids ad-hoc metrics.',
    reviews: [
      {
        rating: 2,
        soundness: 3,
        presentation: 2,
        contribution: 2,
        summary: 'This paper introduces CogVLM，a powerful open-sourcevisual language foundation model.CogVLM is a visual languagefoundation model. CogVLM is different from the popular shallowalignment method which maps imagefeatures into the input space oflanguage model. CogVLM bridges thegap between the frozen pretrainedlanguage model and image encoder bya trainable visual expert module inthe attention and FFN layers. CogVLM-17B achieves state-of-the-artperformance on 10 classic cross-modal benchmarks. CogVLM-17B surpasses or matches PaLI-X 55B.',
        strengths: '1. CogVLM is provided as an open-source resource.\n2. CogVLM achieves excellent results ona wide range of benchmarks.\n3. The paper mainly focuses on the experimental results.',
        weaknesses: '1. The paper mainly focuses on the experimental results and does not provide in-depth analysis.',
      },
      {
        rating: 2,
        soundness: 3,
        presentation: 2,
        contribution: 3,
        summary: '∂',
        strengths: 'Holy',
        weaknesses: '[MASK]',
      },
      {
        rating: 4,
        soundness: 2,
        presentation: 1,
        contribution: 3,
        summary: '∂',
        strengths: 'Holy',
        weaknesses: '[MASK]',
      },
      {
        rating: 4,
        soundness: 2,
        presentation: 1,
        contribution: 3,
        summary: '∂',
        strengths: 'Holy',
        weaknesses: '[MASK]',
      },
    ],
    ac: {
      decision: 'Accept (Spotlight).',
      comments: 'GOOD!!!!',
    }
  },
]});
