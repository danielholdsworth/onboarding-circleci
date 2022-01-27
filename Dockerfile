FROM circleci/runner:launch-agent
RUN sudo apt-get update; \
    sudo apt-get install --no-install-recommends -y \
        python3