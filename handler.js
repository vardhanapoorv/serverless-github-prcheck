'use strict';
const Github = require("github-client")

var Closing_keywords = [
  "close",
  "closes",
  "closed",
  "fix",
  "fixes",
  "fixed",
  "resolve",
  "resolves",
  "resolved"
]

module.exports.githubPRCheck = (event, context, callback) => {
  var gh = Github.new({
    token: process.env.GITHUB_TOKEN
  });
  const body = JSON.parse(event.body);
  const { pull_request, repository } = body;
  const repository_name = repository.full_name;
  const { sha } = pull_request.head;
  const pr_body = pull_request.body;
    for (var words of Closing_keywords) {
      if(pr_body.indexOf(words) > -1){
        console.log("well done")
        return true; 
      }
    }
     console.log("Pull request hasn't fixed anything Fuck off!!!")
     return false
        
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
