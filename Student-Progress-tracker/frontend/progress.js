const progressList=document.getElementById("progressList")

async function getProgress() {
    try{
        const response=await fetch("/student-progress")
        const data=await response.json();

        progressList.innerHTML="";
        data.forEach(progress=>{
            const card= document.createElement("div")

            card.className="progress-card";

            card.innerHTML=`
            <h3>${progress.name}</h3>
            <h4>${progress.course}</h4>
            <p>
            <strong>Completion:</strong>
            ${progress.completionPercentage}%
            </p>

            <div class="progress-container">
            <div
            class="progress-bar"
            style="width:${progress.completionPercentage}%">
            </div>
            </div>
           `
           progressList.appendChild(card)
        })  

    }catch(error){
        console.log("Error:",error);
        
        progressList.innerHTML=`
        <p>Failed to Load Progress`
    }
}
getProgress()