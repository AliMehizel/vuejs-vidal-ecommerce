// Import the necessary dependencies



const useStripe = async(oreder_id)=>{

    try {
      const response = await fetch('http://127.0.0.1:8000/payments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type for your data
        },
        body: JSON.stringify({oreder_id:oreder_id}), // Convert your data to JSON string
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error occurred:', error);
      // You can handle errors or propagate them to the calling function.
      // For this example, I'm just returning null if there's an error.
      return null;
    }

}


export default useStripe