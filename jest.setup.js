jest.mock('src/repositories/maintenance.repository.ts', () => ({
  create: jest.fn().mockImplementation((data) => ({
    _id: 'mock-id',
    ...data,
    resolved: false
  })),
  findByPriority: jest.fn().mockImplementation((priority) => {
    if (priority === 'HIGH') {
      return [{
        _id: 'high-1',
        priorityLevel: 'HIGH',
        originalMessage: 'Emergency issue',
        submissionDate: new Date(),
        resolved: false
      }];
    }
    return [];
  })
}));

jest.mock('src/managers/messageAnalyzer', () => ({
  exec: jest.fn().mockImplementation((message) => {
    if (message.includes('gas')) {
      return {
        keywords: ['gas'],
        priority: 'HIGH',
        urgencyIndicators: 2,
        priorityScore: 0.9
      };
    }
    return {
      keywords: [],
      priority: 'LOW',
      urgencyIndicators: 0,
      priorityScore: 0.1
    };
  })
}));