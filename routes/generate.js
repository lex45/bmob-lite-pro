const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { subid, cid } = req.query;
  if (!cid || !subid) return res.status(400).send('CID/SubID required');

  const pixel = `
<script>
  (function(){
    var i = new Image();
    i.src = "http://localhost:3000/click?cid=${cid}&subid=${subid}";
  })();
</script>
  `;
  res.send(`<pre>${pixel}</pre>`);
});

module.exports = router;