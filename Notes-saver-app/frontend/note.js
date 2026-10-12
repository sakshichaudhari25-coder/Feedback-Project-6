const notesList=document.getElementById("notesList")

async function getNotes() {
    try{
        const response=await fetch("/note-saver")
        const data=await response.json()

        notesList.innerHTML=""
        data.forEach(note=>{
            const card=document.createElement("div")

            card.className="note-card";
            card.innerHTML=`
            <h4>${note.title}</h4>
            <div class="notes-container">
            <p>${note.content}</p>
            </div>
            <button class="deleteBtn" data-id=${note._id}">
            Delete </button>`
            notesList.appendChild(card)

            const deletBtn=card.querySelector(".deleteBtn");
            deletBtn.addEventListener("click",async()=>{
                try{
                    const response=await fetch(`/note-saver/${note._id}`,{
                        method:"DELETE"
                    });
                    const result=await response.json()
                    if(result.success){
                        card.remove();
                    }
                    }catch(error){
                        console.log("Error Deteting:", error);
                }
            })
        })
    }catch(error){
        console.log("Error:", error);

        notesList.innerHTML=`
        <P>Failed to get Notes</p>`
        
    }
}
getNotes()