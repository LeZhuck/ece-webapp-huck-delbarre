import Head from 'next/head'
import Image from 'next/image'



let URL = "http://localhost:3000/articles/"

let db = {
    articles: [
        {
            id: '1',
            title: 'Journée de grève, en direct',
            content: 'Partout en France se tiennent des assemblées générales (AG) de cheminots  254 au total, selon Laurent Brun, secrétaire général de la CGT-Cheminots  c est à elles de décider de la reconduction ou non de la grève. Juridiquement, elle peut l être.  L appel pour la journée de mardi 18 octobre a été lancé sur la base d un préavis datant de novembre 2019, qui portait sur les retraites, était signé CGT, SUD et UNSA et n a jamais été levé. « Dans la précipitation, les organisations syndicales sont allées chercher ce préavis dormant », explique François Nogué, directeur des ressources humaines (DRH) de la SNCF, qui le déplore.Partout en France se tiennent des assemblées générales (AG) de cheminots 254 au total, selon Laurent Brun, secrétaire général de la CGT-Cheminots  c est à elles de décider de la reconduction ou non de la grève. Juridiquement, elle peut l être.',


            date: '17/10/2022',
            author: 'Martin Huck'
        },
        {
            id: '2',
            title: 'Guerre en Ukraine, en direct : vague de frappes russes sur des installations électriques dans plusieurs villes ukrainiennes',
            content: 'L Ukraine a annoncé mardi des bombardements sur les installations électriques de plusieurs grandes villes, dont Kiev, au lendemain d attaques russes meurtrières à l aide de drones kamikazes sur la capitale. Le maire de Kiev, Vitali Klitschko, a annoncé sur Telegram que de nouvelles explosions avaient eu lieu dans la capitale ukrainienne. Il a précisé qu elles avaient été entendues dans le quartier de Desnianskyi et avaient touché « une installation d infrastructure critique ». « Tous les services se rendent sur place », a-t-il encore écrit.',
            date: '18/10/2022',
            author: 'Clement Delbarre'
        },
        {
            id: '3',
            title: 'Cancers de l\'ovaire : vers une amélioration du pronostic',
            content: 'Ce cancer est asymptomatique au stade précoce, si bien que « 75% des femmes sont diagnostiquées à un stade avancé, lorsque les cellules cancéreuses atteignent le péritoine[membrane entourant les organes abdominaux]», explique la professeure Isabelle Ray-Coquard, cancérologue au centre Léon-Bérard, à Lyon, présidente du groupe coopérateur Gineco, qui réunit des chercheurs autour d\'essais thérapeutiques consacrés aux cancers gynécologiques. Elle est également coordinatrice nationale du réseau de prise en charge des cancers rares des ovaires. Jusqu\'à présent, les chercheurs n\'ont pas réussi à identifier de marqueurs biologiques des tumeurs ovariennes et, faute de technique d\'imagerie médicale suffisamment fine, les campagnes de dépistage sont des échecs. Une ablation préventive peut être proposée aux femmes génétiquement prédisposées, facteur de risque le plus important (les autres étant l\'obésité, l\'absence de grossesse, et la précocité des règles).',
            date: '15/10/2022',
            author: 'Charles Gave'
        },
        {
            id: '4',
            title: 'JO de Paris 2024 : un programme des volontaires « varié » et « ouvert à tous »',
            content: 'Alexandre Morenon l\'assure : les 45 000 bénévoles des Jeux olympiques et paralympiques vont « vivre l’expérience d\'une vie ». Le directeur délégué des volontaires du Comité d\'organisation de Paris 2024 (Cojop) a présenté, lundi 17 octobre, un programme « qui se veut ouvert à tous ». Seules trois conditions sont nécessaires pour postuler : avoir au moins 18 ans au 1er janvier 2024, parler soit français, soit anglais, et être mobilisable au minimum dix jours pendant les Jeux olympiques ou les paralympiques.',
            date: '18/10/2022',
            author: 'Crack Tinmar'
        },


    ]


}

export default function Artciles() {
    return (
        <div class= "py-8">
            <Head>
                <title >WebApp React</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main class = "px-2 flex-1 flex-col flex justify-center items-center">
                <h1 class="m-0 leading-5 text-6xl mb-4">
                    Our Articles
                </h1>

                <div class="flex items-center justify-center flex-wrap max-w-4xl">


                    {db['articles'].map(articles => <a key={articles.id} href={URL + articles.id} class="m-4 p-6 text-left border-solid border-2 border-black rounded-xl ease-linear max-w-xs" > <h2>{`${articles.title}, ${articles.date} `}</h2> </a>)}

                    <p>Find all of our recent Articles</p>



                </div>
            </main>





        </div>
    )
}
