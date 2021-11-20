# Circle CI Solutions and Success Engineer Technical Assessment

This project was created to complete the Circle CI Technical Interview Assessment

## Docker Challenges

In the project directory, you can run:

### Exercise 1

    docker run -it circleci/challenge-1 bash

First things first - get curl running on our container

    apt-get update; apt-get install curl

I have to say I was a little confused when the proxy error popped up initally. I knew I had no proxy set on my local machine so I first tried to debug by running the container with some envs like so my curl command from in the container would ignore the myproxy.local

1) docker run --rm --env no_proxy="http://myproxy.local" -it circleci/challenge-1 bash

When I noticed this didnt work and I was getting back the same error I began to explore some of the documentation on Curl from my command line. 
    
    curl --help

I noticed a ``noproxy`` flag so gave this a try. According to the curl manual this takes a comma-separated list of hosts that do not use the proxy but I just keyed in ``'*'``. 

    curl --noproxy '*' google.com

I then became curious as to where this proxy was coming from so I had a look around the container for the ``.bashrc`` file. I navigated to the ``root`` directory where I found my ``.bashrc`` and also a ``.curlrc`` that caught my eye. 

I then installed my favourite linux text editor on the container ``vim`` and opened up the ``.curlrc`` file. I simply commented out/removed the proxy declaration here and I could then simply run

    curl google.com


### Exercise 2

I ran the container whose job is to serve up a simple hello-world container. 

    docker run circleci/challenge-2

When I tried to hit the endpoint going to ``localhost:8000`` in chrome, I was unable to access the site. This is due to the fact that none of the containers ports were published to the outside world.

In order to access the site I needed to map a port on the container to the port on the Docker host which will give me access to the website.

    docker run -p 8000:8000 circleci/challenge-2

This maps port 8000 in the container to port 8000 on the docker host and enables us to hit the website from our browser.

### Exercise 3

I fired up this container with the following command 

    docker run --rm -d -p 8000:80 circleci/challenge-3

I then exec'd into the container using the container ID and had a look around.

I ``cd`` in this directory ``/etc/nginx/`` and ran the following command

    cat nginx.conf

I looked for this line ``include /etc/nginx/conf.d/*.conf;`` which told me that all the confs in this directory were used.

I then went to this directory and noted that this had one file, ``default.conf``.

In here I could see some information that was given to me in the exercise specification such as the server (``localhost``) and the port (``80``).

I also noted the file that would be displayed is in this directory

    /usr/share/nginx/html/

I took a look at the file here and saw the 'Welcome to nginx' homepage.

I then located the ``Hello World`` file that we want to display in this location

    /etc/mysite/index.html

I then mounted this file to the location declared in the default.conf like so

    mv /etc/mysite/index.html /usr/share/nginx/html/index.html

Now when I tried to hit localhost:8000 I was able to see the ``Hello World`` html

### Exercise 4

    docker run -d circleci/challenge-4

    docker exec -it e2e8fd353c70 /bin/sh

 1) What processes are using memory

It is possible to show all the processes running inside a container without
login to terminal by using the following command. Of course,
it is just like how one can see by using ps -eaf, so just add it to docker exec.

    sudo docker exec -it c1bdbe1323a9 ps -eaf

    docker top c1bdbe1323a9 

Likewise we can also exec into the container and run the same commands (dropping the ``docker`` & ``<container-id>``)

 2) Where were the processes started from?

 I like to use ``ps few`` to find this out.

 Its important to note here that if a program was started out of someones $PATH, you
 will only see the executable name, not the full path

 3) Can you stop the processes?

 Sure, ones we identify the processes we want to kill on the container we can do so with the following command 

    sudo kill <PID>

## Build and Test

The pplication is this repository is a simple Hello-World react app.

The app contains a button and when clicked it will display some new text to the screen 
'``Here is a simple Hello World``'.

The test suite contains one test to test the functionality of this button, 
'``Should display text``'.

The following is the link for the Circle CI Build & Test https://app.circleci.com/pipelines/github/derry-b-96/circleci-demo?branch=main

Our Workflow has two steps ``build`` & ``heroku/deploy-via-git``. 

* ``Build`` uses a CircleCI provided Docker Image ``circleci/node:12.9.1-browsers`` and 
includes the following steps

    1) Checkout
    2) Update NPM
    3) Restore Cache
    4) Install Dependencies
    5) Save Cache
    6) Run Tests


## Deploy (optional)
* ``heroku/deploy-via-git`` is a pre configured job offered by CircleCI. In order to 
utilize this job we must import and invoke the herouku orb like so

        orbs:
            heroku: circleci/heroku@0.0.10 


Before utilizing the built in heroku capability offered by CircleCI we must first deploy the application from our own machine. 

1) Set up your Heroku Environment 
2) Confirm your GIT repository. At this point we can push directly to the Herouku master branch
3) We can then configure CircleCI and create the environment variables needed to deploy our Heroku Application

Once deployed and configured to utilize CircleCI, and changes we commit to our application can be viewed at the following URL hosted by Heroku: 
https://circle-react-dboi.herokuapp.com/



