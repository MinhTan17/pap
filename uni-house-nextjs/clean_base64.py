import json
import re

# Read file
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract products array
products_match = re.search(r'export const products: ProductItem\[\] = (\[[\s\S]*?\n\])', content)
if products_match:
    products_str = products_match.group(1)
    products = eval(products_str)
    
    # Clean base64 images
    cleaned_count = 0
    for product in products:
        if 'images' in product and product['images']:
            original_count = len(product['images'])
            product['images'] = [img for img in product['images'] if not img.startswith('data:image')]
            if len(product['images']) < original_count:
                cleaned_count += 1
                print(f"Product ID {product['id']}: Removed {original_count - len(product['images'])} base64 images")
    
    # Rebuild file content
    header = content[:products_match.start(1)]
    footer_match = re.search(r'\n\]\n\nexport const categories', content)
    footer = content[footer_match.start():] if footer_match else '\n]'
    
    new_content = header + json.dumps(products, indent=2, ensure_ascii=False) + footer
    
    # Write back
    with open('src/data/products.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\n✅ Cleaned {cleaned_count} products with base64 images")
else:
    print("❌ Could not find products array")
