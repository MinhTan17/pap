// Test services API endpoint
const testServicesAPI = async () => {
  try {
    console.log('Testing /api/services endpoint...\n')
    
    const response = await fetch('http://localhost:3000/api/services')
    const data = await response.json()
    
    console.log('Status:', response.status)
    console.log('Services count:', Array.isArray(data) ? data.length : 'Not an array')
    console.log('\nFirst service:')
    console.log(JSON.stringify(data[0], null, 2))
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testServicesAPI()
