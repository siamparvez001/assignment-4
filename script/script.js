let jobs = [
    { id: 1, companyName: "Creative IT", position: "Frontend Dev", location: "Dhaka", type: "Full-time", salary: "40k - 50k", description: "Looking for a React developer with clean coding skills.", status: "All", appStatus: "NOT APPLIED" },
    { id: 2, companyName: "Inovative Soft", position: "UI/UX Designer", location: "Remote", type: "Full-time", salary: "30k - 40k", description: "Must have experience in Figma and Adobe XD.", status: "All", appStatus: "NOT APPLIED" },
    { id: 3, companyName: "Dynamic Lab", position: "Backend Dev", location: "Sylhet", type: "Hybrid", salary: "60k - 80k", description: "Node.js and MongoDB knowledge is required.", status: "All", appStatus: "NOT APPLIED" },
    { id: 4, companyName: "Tech Vision", position: "App Developer", location: "Dhaka", type: "Contract", salary: "50k - 70k", description: "Experience in Flutter or React Native.", status: "All", appStatus: "NOT APPLIED" },
    { id: 5, companyName: "Web Solution", position: "MERN Stack Dev", location: "Chittagong", type: "Full-time", salary: "45k - 60k", description: "Full stack development with focus on React.", status: "All", appStatus: "NOT APPLIED" },
    { id: 6, companyName: "Soft Park", position: "QA Engineer", location: "Remote", type: "Full-time", salary: "35k - 45k", description: "Manual and Automated testing specialist.", status: "All", appStatus: "NOT APPLIED" },
    { id: 7, companyName: "Cyber Net", position: "System Admin", location: "Dhaka", type: "Full-time", salary: "40k - 55k", description: "Linux server and networking knowledge.", status: "All", appStatus: "NOT APPLIED" },
    { id: 8, companyName: "Design Agency", position: "Graphics Designer", location: "Remote", type: "Part-time", salary: "20k - 30k", description: "Creating marketing materials and social posts.", status: "All", appStatus: "NOT APPLIED" }
];

let currentTab = 'All';

function renderJobs() {
    const container = document.getElementById('job-container');
    const filteredJobs = currentTab === 'All' ? jobs : jobs.filter(j => j.status === currentTab);
    
    // Counter updates
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'Interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'Rejected').length;
    document.getElementById('section-count').innerText = filteredJobs.length;

    container.innerHTML = '';

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="col-span-full bg-white p-20 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                <img src="images/jobs.png" alt="No Jobs" class="w-40 mb-6 opacity-80">
                <h2 class="text-2xl font-bold text-slate-800">No jobs available</h2>
                <p class="text-gray-400 mt-2">Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }

    filteredJobs.forEach(job => {
        container.innerHTML += `
            <div class="bg-white p-8 rounded-3xl border border-gray-100 card-shadow relative">
                <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-gray-300 hover:text-red-500">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="mb-4">
                    <h4 class="text-xl font-bold text-slate-900">${job.position}</h4>
                    <p class="text-blue-500 font-bold text-sm uppercase mt-1 tracking-wide">${job.companyName}</p>
                </div>
                <div class="flex gap-4 text-xs font-bold text-gray-400 mb-4 uppercase">
                    <span><i class="fas fa-map-marker-alt mr-1"></i> ${job.location}</span>
                    <span><i class="fas fa-clock mr-1"></i> ${job.type}</span>
                    <span><i class="fas fa-wallet mr-1"></i> ${job.salary}</span>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">${job.description}</p>
                <p class="text-xs font-bold ${job.appStatus === 'NOT APPLIED' ? 'text-gray-400' : (job.appStatus === 'INTERVIEW' ? 'text-green-500' : 'text-red-500')} mb-4 uppercase tracking-widest">${job.appStatus}</p>
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'Interview')" class="flex-1 py-3 rounded-xl border-2 border-green-500 text-green-600 font-extrabold hover:bg-green-500 hover:text-white transition-all">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'Rejected')" class="flex-1 py-3 rounded-xl border-2 border-red-500 text-red-600 font-extrabold hover:bg-red-500 hover:text-white transition-all">Rejected</button>
                </div>
            </div>
        `;
    });
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('button[id^="tab-"]').forEach(btn => btn.classList.remove('active-tab'));
    document.getElementById(`tab-${tab}`).classList.add('active-tab');
    renderJobs();
}

function updateStatus(id, type) {
    const job = jobs.find(j => j.id === id);
    job.status = type;
    job.appStatus = type.toUpperCase();
    renderJobs();
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderJobs();
}

renderJobs();