// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let db = {
  Profiles: [
    { username: 'clementD', mail: "clem.delb@gmail.com" },
    { username: 'titi', mail: "titi.huck@gmail.com" },
    { username: 'toto', mail: "toto@gmail.com" },


  ]


}



export default function handler(req, res) {
  res.status(200).json({ Profiles: db.Profiles })

  
}
