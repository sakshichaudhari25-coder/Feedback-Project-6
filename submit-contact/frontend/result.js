const contactList=document.getElementById("contactList")

async function getContacts() {
    try{
        const response=await fetch("/submit-contact")
        const data=await response.json()

        contactList.innerHTML="";
        data.forEach(contact=>{
            const card=document.createElement("div")

            card.className="contact-card";
            card.innerHTML=`
            <h4>${contact.name}</h4>
            <p>${contact.email}</p>
            <p>
            <div classsName="contact-container">
            ${contact.message}</div>
            <button class="delete-btn dara-id=${contact._id}">
            Delete
            </button>`
            contactList.appendChild(card)

            const deleteBtn=card.querySelector(".delete-btn");
            deleteBtn.addEventListener("click",async()=>{
                try{
                    const response=await fetch(`/submit-contact/${contact._id}`,{
                      method:"DELETE"
                    });
                    const result=await response.json()
                    if(result.success){
                        card.remove()
                    }
                }catch(error){
                    console.log("Error deleting:",error);
                    
                }
            })
        })
    }catch(error){
        console.log("Error:",error);

        contactList.innerHTML=`
        <p>Failed to get Contact</p>`
        
    }
    
}
getContacts()