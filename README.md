 > Node.js app, to run a remote port forwarding trough NAT, over SSH tunnel


 ---
Server

    sudo echo 'GatewayPorts yes' >> /etc/ssh/sshd_config
    sudo service ssh restart
    cd .ssh
    ssh-keygen -t rsa
    * (hit return through prompts)
    cat id_rsa.pub >> authorized_keys
    chmod 600 authorized_keys
    rm id_rsa.pub

Remote Client Authentication

    cd .ssh
    scp ssh-router.com:.ssh/id_rsa ssh-router.rsa
    chmod 600 ssh-router.rsa
    echo "Host ssh-router" >> config
    echo "User user" >> config
    echo "Hostname gw.zaralab.org" >> config
    echo "Port 22" >> config
    echo "StrictHostKeyChecking no" >> config
    echo "IdentityFile ~/.ssh/ssh-router.rsa" >> config

Test

    ssh ssh-router

Remote Client

    cd ~/
    git clone ..
    cd ..
    npm install
    node index.js

Run as service

    cd/etc/init.d
