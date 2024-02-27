import Mock from 'better-mock';

Mock.setup({});

Mock.mock(/date/, 'get', () => {
    return {
        start: 1708531200000,
        end: 1709012299724,
    };
});
