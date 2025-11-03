import ProductDetailContent from './ProductDetailContent'

interface ProductDetailProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { id } = await params
  
  return <ProductDetailContent productId={id} />
}
