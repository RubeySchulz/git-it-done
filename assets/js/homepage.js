var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var formSubmitHandler = function(event){
    event.preventDefault();
    
    var username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

var displayRepos = function(repos, searchTerm){
    //check to see if there are any repos
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos 
    for(var i = 0; i < repos.length; i++){
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        repoEl.append(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if(repos[i].open_issues_count > 0){
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.append(statusEl);

        repoContainerEl.append(repoEl);
    }

}

var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        //request was successful
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
        
    })
    .catch(function(error) {
        //catches network errors out of our control
        alert("Unable to connect to GitHub");
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);