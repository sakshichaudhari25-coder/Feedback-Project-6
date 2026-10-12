const feedbackList = document.getElementById("feedbackList");

async function getFeedback() {
    try {
        const response = await fetch("/feedback");
        const data = await response.json();

        feedbackList.innerHTML = "";

        data.forEach(feedback => {
            const card = document.createElement("div");

            card.className = "feedback-card";

            card.innerHTML = `
                <h3>${feedback.name}</h3>

                <div class="rating">
                    ⭐ Rating: ${feedback.rate}
                </div>

                <div class="comment">
                    ${feedback.comment}
                </div>
            `;

            feedbackList.appendChild(card);
        });

    } catch (error) {

        console.log("Error:", error);

        feedbackList.innerHTML = `
            <p>Failed to load feedback.</p>
        `;
    }
}

getFeedback();