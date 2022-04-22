var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //reponse was successful
        if(response.ok){
            response.json().then(function(data){
                displayIssues(data);
            })
        } else {
            alert("There was a problem with your request");
        }
    });
}

var displayIssues = function(issues){
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues";
        return;
    }
    for(var i = 0; i < issues.length; i++){
        //create a link element to take them to the issue
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.append(titleEl);

        //type element
        var typeEl = document.createElement("span");
        //check if its an issue or a pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.append(typeEl);
        issueContainerEl.append(issueEl);
    }

}

getRepoIssues("RubeySchulz/git-it-done");