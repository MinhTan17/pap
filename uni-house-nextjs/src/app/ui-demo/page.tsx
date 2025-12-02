'use client'

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Input,
  Textarea,
  Badge,
  Skeleton,
  Heading,
  Text,
  Lead,
  Blockquote,
  Code,
  List,
  ListItem,
  Section,
  Container,
  Stack,
  Grid,
  Flex,
  Spacer,
  Animation,
  StaggeredAnimation,
  Parallax,
  HoverEffect
} from '@/components/ui';

export default function UIDemoPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Section spacing="loose" className="bg-white">
        <Container>
          <Stack spacing="lg" align="center">
            <Heading level={1} variant="display" gradient>
              UI Component Demo
            </Heading>
            <Lead className="text-center max-w-2xl">
              Showcase của modern design system và UI components mới với typography cải tiến
            </Lead>
          </Stack>
        </Container>
      </Section>

      {/* Typography Section */}
      <Section spacing="normal">
        <Container>
          <Stack spacing="xl">
            <div className="text-center">
              <Heading level={2} variant="heading">Typography System</Heading>
              <Text variant="body-large" color="muted" className="mt-4">
                Hệ thống typography mới với visual hierarchy rõ ràng
              </Text>
            </div>

            <Grid cols={2} gap="lg">
              <Card className="card-lg">
                <CardHeader>
                  <CardTitle>Heading Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack spacing="md">
                    <Heading level={1} variant="display">Display Heading</Heading>
                    <Heading level={2} variant="heading">Section Heading</Heading>
                    <Heading level={3} variant="subheading">Subsection Heading</Heading>
                    <Heading level={4}>Card Heading</Heading>
                  </Stack>
                </CardContent>
              </Card>

              <Card className="card-lg">
                <CardHeader>
                  <CardTitle>Text Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack spacing="md">
                    <Lead>Lead text for important introductions</Lead>
                    <Text variant="body-large">Large body text for emphasis</Text>
                    <Text variant="body">Regular body text for content</Text>
                    <Text variant="body-small" color="muted">Small text for details</Text>
                    <Text variant="caption">CAPTION TEXT</Text>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Card className="card-lg">
              <CardHeader>
                <CardTitle>Content Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack spacing="lg">
                  <div>
                    <Heading level={4} className="mb-4">Lists</Heading>
                    <Grid cols={2} gap="md">
                      <List variant="unordered" spacing="normal">
                        <ListItem>Unordered list item 1</ListItem>
                        <ListItem>Unordered list item 2</ListItem>
                        <ListItem>Unordered list item 3</ListItem>
                      </List>
                      <List variant="ordered" spacing="normal">
                        <ListItem>Ordered list item 1</ListItem>
                        <ListItem>Ordered list item 2</ListItem>
                        <ListItem>Ordered list item 3</ListItem>
                      </List>
                    </Grid>
                  </div>

                  <div>
                    <Heading level={4} className="mb-4">Blockquote</Heading>
                    <Blockquote>
                      "Design is not just what it looks like and feels like. Design is how it works."
                    </Blockquote>
                  </div>

                  <div>
                    <Heading level={4} className="mb-4">Code</Heading>
                    <Flex gap="md" wrap>
                      <Code variant="inline">inline code</Code>
                      <Code variant="block">
{`function hello() {
  console.log("Hello World!");
}`}
                      </Code>
                    </Flex>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Section>

      {/* Buttons Section */}
      <Section spacing="normal" className="bg-neutral-100">
        <Container>
          <Card className="card-lg">
            <CardHeader>
              <CardTitle>Button Components</CardTitle>
              <CardDescription>
                Các variants và sizes khác nhau của button component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Stack spacing="lg">
                {/* Button Variants */}
                <div>
                  <Heading level={4} className="mb-4">Variants</Heading>
                  <Flex gap="md" wrap>
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                  </Flex>
                </div>

                {/* Button Sizes */}
                <div>
                  <Heading level={4} className="mb-4">Sizes</Heading>
                  <Flex gap="md" wrap align="center">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </Flex>
                </div>

                {/* Button States */}
                <div>
                  <Heading level={4} className="mb-4">States</Heading>
                  <Flex gap="md" wrap>
                    <Button loading={loading} onClick={() => setLoading(!loading)}>
                      {loading ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <Button disabled>Disabled Button</Button>
                    <Button 
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      }
                    >
                      With Icon
                    </Button>
                  </Flex>
                </div>

                {/* Badges */}
                <div>
                  <Heading level={4} className="mb-4">Badges</Heading>
                  <Flex gap="md" wrap>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </Flex>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Cards Section */}
      <Section spacing="normal">
        <Container>
          <Stack spacing="lg">
            <div className="text-center">
              <Heading level={2}>Card Components</Heading>
              <Text variant="body-large" color="muted" className="mt-4">
                Các loại card khác nhau với effects và interactions
              </Text>
            </div>

            <Grid cols={3} gap="lg">
              <Card variant="default" hover className="card-md">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>
                    Card mặc định với hover effect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="body" color="secondary">
                    Đây là nội dung của card. Card này có hover effect khi di chuột qua.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardFooter>
              </Card>

              <Card variant="elevated" className="card-md">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>
                    Card với shadow nâng cao
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="body" color="secondary">
                    Card này có shadow lớn hơn để tạo cảm giác nổi bật.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" size="sm">Get Started</Button>
                </CardFooter>
              </Card>

              <Card variant="interactive" className="card-md">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>
                    Card có thể click được
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="body" color="secondary">
                    Card này có cursor pointer và hover effects mạnh hơn.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" size="sm">Click Me</Button>
                </CardFooter>
              </Card>
            </Grid>

            {/* Loading States */}
            <Card className="card-lg">
              <CardHeader>
                <CardTitle>Loading States</CardTitle>
                <CardDescription>Skeleton components cho loading states</CardDescription>
              </CardHeader>
              <CardContent>
                <Grid cols={2} gap="lg">
                  <Stack spacing="md">
                    <Heading level={5}>Text Skeletons</Heading>
                    <Skeleton variant="text" lines={3} />
                  </Stack>
                  <Stack spacing="md">
                    <Heading level={5}>Shape Skeletons</Heading>
                    <Flex gap="md" align="center">
                      <Skeleton variant="circular" width={48} height={48} />
                      <Stack spacing="sm">
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </Stack>
                    </Flex>
                  </Stack>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Section>

      {/* Form Section */}
      <Section spacing="normal" className="bg-neutral-100">
        <Container size="md">
          <Card className="card-lg">
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>
                Modern form inputs với validation states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing="lg">
                  <Input
                    label="Họ và tên"
                    placeholder="Nhập họ và tên của bạn"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />

                  <Input
                    type="email"
                    label="Email"
                    placeholder="example@email.com"
                    helper="Chúng tôi sẽ không chia sẻ email của bạn"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />

                  <Input
                    label="Số điện thoại"
                    placeholder="0123456789"
                    error="Số điện thoại không hợp lệ"
                  />

                  <Textarea
                    label="Tin nhắn"
                    placeholder="Nhập tin nhắn của bạn..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />

                  <Flex gap="md">
                    <Button type="submit" loading={loading}>
                      Gửi tin nhắn
                    </Button>
                    <Button type="button" variant="outline">
                      Hủy bỏ
                    </Button>
                  </Flex>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Animations & Micro-interactions Demo */}
      <Section spacing="normal">
        <Container>
          <Stack spacing="xl">
            <Animation type="fadeInUp">
              <div className="text-center">
                <Heading level={2} variant="heading">Animations & Micro-interactions</Heading>
                <Text variant="body-large" color="muted" className="mt-4">
                  Smooth animations và interactive effects để cải thiện user experience
                </Text>
              </div>
            </Animation>

            <Grid cols={2} gap="lg">
              <Animation type="fadeInLeft" delay={200}>
                <Card className="card-lg">
                  <CardHeader>
                    <CardTitle>Hover Effects</CardTitle>
                    <CardDescription>
                      Các hiệu ứng hover khác nhau cho interactive elements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stack spacing="md">
                      <HoverEffect effect="lift">
                        <div className="p-4 bg-primary-50 rounded-lg cursor-pointer">
                          <Text variant="body" weight="medium">Hover Lift Effect</Text>
                        </div>
                      </HoverEffect>
                      
                      <HoverEffect effect="scale">
                        <div className="p-4 bg-secondary-50 rounded-lg cursor-pointer">
                          <Text variant="body" weight="medium">Hover Scale Effect</Text>
                        </div>
                      </HoverEffect>
                      
                      <HoverEffect effect="glow">
                        <div className="p-4 bg-success-50 rounded-lg cursor-pointer">
                          <Text variant="body" weight="medium">Hover Glow Effect</Text>
                        </div>
                      </HoverEffect>
                    </Stack>
                  </CardContent>
                </Card>
              </Animation>

              <Animation type="fadeInRight" delay={400}>
                <Card className="card-lg">
                  <CardHeader>
                    <CardTitle>Loading Animations</CardTitle>
                    <CardDescription>
                      Các animation states cho loading và feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stack spacing="md">
                      <div className="flex items-center gap-4">
                        <div className="animate-spin w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full"></div>
                        <Text variant="body">Spinning Loader</Text>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="animate-pulse w-6 h-6 bg-primary-600 rounded-full"></div>
                        <Text variant="body">Pulsing Indicator</Text>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="animate-bounce w-6 h-6 bg-primary-600 rounded-full"></div>
                        <Text variant="body">Bouncing Ball</Text>
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              </Animation>
            </Grid>

            <Animation type="scaleIn" delay={600}>
              <Card className="card-lg">
                <CardHeader>
                  <CardTitle>Staggered Animations</CardTitle>
                  <CardDescription>
                    Animation theo sequence với delay khác nhau
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StaggeredAnimation itemCount={6} delay={150}>
                    {(visibleItems) => (
                      <Grid cols={3} gap="md">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={index}
                            className={cn(
                              'p-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg text-center transition-all duration-500',
                              visibleItems.includes(index) 
                                ? 'opacity-100 transform translate-y-0' 
                                : 'opacity-0 transform translate-y-4'
                            )}
                          >
                            <Text variant="body" weight="medium">Item {index + 1}</Text>
                          </div>
                        ))}
                      </Grid>
                    )}
                  </StaggeredAnimation>
                </CardContent>
              </Card>
            </Animation>

            <Animation type="fadeInUp" delay={800}>
              <Card className="card-lg">
                <CardHeader>
                  <CardTitle>Interactive Buttons</CardTitle>
                  <CardDescription>
                    Enhanced button interactions với ripple effects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Flex gap="md" wrap>
                    <Button className="btn-animate ripple">Animated Button</Button>
                    <Button variant="outline" className="hover-lift-sm">Lift on Hover</Button>
                    <Button variant="secondary" className="hover-scale-sm">Scale on Hover</Button>
                    <Button variant="ghost" className="hover-glow">Glow Effect</Button>
                  </Flex>
                </CardContent>
              </Card>
            </Animation>
          </Stack>
        </Container>
      </Section>

      {/* Visual Hierarchy Demo */}
      <Section spacing="loose" className="bg-gradient-to-br from-primary-50 to-secondary-50">
        <Container>
          <Stack spacing="xl" align="center">
            <Animation type="fadeInDown">
              <div className="text-center">
                <Heading level={1} variant="display" gradient className="mb-6">
                  Visual Hierarchy
                </Heading>
                <Lead className="max-w-3xl">
                  Hệ thống visual hierarchy giúp tạo ra trải nghiệm đọc tốt hơn với spacing và typography được tối ưu hóa
                </Lead>
              </div>
            </Animation>

            <Animation type="fadeInUp" delay={400}>
              <div className="reading-width">
                <Stack spacing="lg">
                  <Heading level={2}>Cải thiện trải nghiệm đọc</Heading>
                  <Text variant="body-large">
                    Typography system mới được thiết kế để cải thiện khả năng đọc và hiểu nội dung. 
                    Với các cấp độ heading rõ ràng và spacing hợp lý.
                  </Text>
                  
                  <Heading level={3}>Các tính năng chính</Heading>
                  <List variant="unordered" spacing="normal">
                    <ListItem>Responsive typography với clamp() functions</ListItem>
                    <ListItem>Consistent spacing system dựa trên 8px grid</ListItem>
                    <ListItem>Improved contrast và readability</ListItem>
                    <ListItem>Semantic color system</ListItem>
                  </List>

                  <Blockquote>
                    "Good typography is invisible. When readers can focus on the content without being distracted by the design, that's when you know you've succeeded."
                  </Blockquote>

                  <Text variant="body">
                    Hệ thống này được xây dựng với accessibility làm ưu tiên hàng đầu, 
                    đảm bảo nội dung có thể được đọc bởi tất cả mọi người.
                  </Text>
                </Stack>
              </div>
            </Animation>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}