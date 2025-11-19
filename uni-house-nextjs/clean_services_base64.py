import json
import re

# Read file
with open('src/data/services.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract services array
services_match = re.search(r'export const services: ServiceItem\[\] = (\[[\s\S]*?\n\])', content)
if services_match:
    services_str = services_match.group(1)
    services = eval(services_str)
    
    # Clean base64 images
    cleaned_count = 0
    for service in services:
        # Clean main image
        if 'image' in service and service['image'] and service['image'].startswith('data:image'):
            print(f"Service ID {service['id']}: Removing base64 main image")
            service['image'] = '/icons/services/default.png'  # Set default
            cleaned_count += 1
        
        # Clean images in detailContent (HTML content)
        if 'detailContent' in service and service['detailContent']:
            original_content = service['detailContent']
            # Remove base64 images from img src
            service['detailContent'] = re.sub(
                r'<img[^>]*src="data:image/[^"]*"[^>]*>',
                '',
                service['detailContent']
            )
            if original_content != service['detailContent']:
                print(f"Service ID {service['id']}: Cleaned base64 images from detailContent")
                cleaned_count += 1
    
    # Rebuild file content
    header = content[:services_match.start(1)]
    
    new_content = header + json.dumps(services, indent=2, ensure_ascii=False) + '\n]'
    
    # Write back
    with open('src/data/services.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\n✅ Cleaned {cleaned_count} services with base64 images")
    
    # Check new file size
    import os
    new_size = os.path.getsize('src/data/services.ts') / (1024 * 1024)
    print(f"📊 New file size: {new_size:.2f} MB")
else:
    print("❌ Could not find services array")
