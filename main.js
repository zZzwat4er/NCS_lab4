const express = require('express');
const app = express();
const port = process.env.PORT || 2000;
const { exec } = require('child_process');

DOMAIN_NAME_REGEX = /^(((?!\-))(xn\-\-)?[a-z0-9\-_]{0,61}[a-z0-9]{1,1}\.)*(xn\-\-)?([a-z0-9\-]{1,61}|[a-z0-9\-]{1,30})\.[a-z]{2,}$/
IPV4_REGEX = /^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/ping', (req, res) => {
  var addr = req.query.addr;
  var cmd = 'ping -c3 ' + addr
  console.log(cmd)
  exec(cmd, (err, stdout, stderr) => {
    res.send(stdout);
  });
});

app.get('/pingfixed', (req, res) => {
  var addr = req.query.addr;
  let dom = addr.match(DOMAIN_NAME_REGEX);
  let ip = addr.match(IPV4_REGEX);
  if(!dom && !ip){
    res.send('bad addres');
    return
  }
  var cmd = 'ping -c3 ' + addr
  console.log(cmd)
  exec(cmd, (err, stdout, stderr) => {
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//http://127.0.0.1:2000/ping?addr=127.0.0.1%20;%20whoami