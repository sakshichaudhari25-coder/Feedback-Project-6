const form=document.getElementById("contactForm")

form.addEventListener("submit",async(e)=>{
    e.preventDefault()

    const name=document.getElementById("name").value
    const email=document.getElementById("email").value
    const message=document.getElementById("message").value

        try{
    const response=await fetch("/submit-contact",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name:name,
            email:email,
            message:message
        })

    })
    
    const result=await response.json()
    console.log(result);
    if(result.success){
        alert("Contact submitted successfully")
        form.reset()
        alert("Failed to submit contact")
    }else{
    }
}catch(error){
    console.log("Error submitting contact:",error);
    
}

})
async function getContacts() {
    try{
        const response=await fetch("/contacts")
        const data=await response.json()
        console.log(data);
    }catch(error){
        console.log("Error fetching contacts:",error);
        
    }
    
}
getContacts();
 
    
