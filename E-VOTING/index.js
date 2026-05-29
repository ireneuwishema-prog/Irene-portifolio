// --- 1. PASTE YOUR FIREBASE CONFIGURATION HERE ---
// You MUST get these keys from the Firebase Console and paste them here.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- 2. FUNCTION TO CAST A VOTE ---
function voteFor(candidateName) {
    // Save the vote to the 'votes' path in the database
    database.ref('votes').push({
        candidate: candidateName,
        timestamp: Date.now()
    })
    .then(() => {
        // Success! Alert the user
        alert(`Thank you! Your vote for ${candidateName} has been recorded.`);
    })
    .catch((error) => {
        // Handle errors
        console.error("Error saving vote:", error);
        alert("Sorry, there was an error. Please check your internet connection.");
    });
}

// --- 3. FUNCTION TO DISPLAY LIVE RESULTS ---
// This function runs whenever data in the 'votes' path changes
database.ref('votes').on('value', (snapshot) => {
    const votesData = snapshot.val();
    const resultsContainer = document.getElementById('results-container');
    
    // Initialize counters
    const counts = {
        'Candidate A': 0,
        'Candidate B': 0,
        'Candidate C': 0
    };

    // If there is data, count the votes
    if (votesData) {
        Object.values(votesData).forEach((vote) => {
            if (counts[vote.candidate] !== undefined) {
                counts[vote.candidate]++;
            }
        });
    }

    // Calculate total votes
    const totalVotes = Object.values(counts).reduce((a, b) => a + b, 0);

    // Generate HTML for the results
    let resultsHTML = '';
    
    for (const [candidate, count] of Object.entries(counts)) {
        // Calculate percentage (avoid division by zero)
        const percentage = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);
        
        resultsHTML += `
            <div class="result-item">
                <strong>${candidate}</strong>
                <span>${count} votes (${percentage}%)</span>
            </div>
            <!-- Simple visual bar for the votes -->
            <div style="background:#e9ecef; height:10px; width:100%; margin-bottom:10px; border-radius:5px;">
                <div style="background:#007bff; height:10px; width:${percentage}%; border-radius:5px;"></div>
            </div>
        `;
    }
    
    // Add total votes at the bottom
    resultsHTML += `<p style="text-align: right; font-weight: bold; margin-top: 15px;">Total Votes: ${totalVotes}</p>`;

    // Update the HTML on the page
    resultsContainer.innerHTML = resultsHTML;
});