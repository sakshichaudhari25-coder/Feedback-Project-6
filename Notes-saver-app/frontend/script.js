const notes=document.getElementById("noteForm");

notes.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const title=document.querySelector("#title").value
    const content=document.querySelector("#content").value
        try{
    const response=await fetch("/note-saver",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },

        body:JSON.stringify({
            title:title,
            content:content
        })
    })

    const result=await response.json()
    console.log(result);
    if(result.success){
        alert("Notes Saved Successfully")
        form.reset()
    }
    
}catch(error){
    console.log("Error:", error);
}
})


