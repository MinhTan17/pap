// Shared simple datasets
export interface ProcessStep {
  step: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  { step: '1', title: 'Tư vấn', description: 'Tư vấn và lên phương án thiết kế' },
  { step: '2', title: 'Thiết kế', description: 'Thiết kế chi tiết và báo giá' },
  { step: '3', title: 'Thi công', description: 'Thi công theo đúng thiết kế' },
  { step: '4', title: 'Hoàn thiện', description: 'Kiểm tra và bàn giao công trình' }
]


