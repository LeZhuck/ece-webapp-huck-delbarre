import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../Components/Layout'

export default function About() {
  return (
    <div>
      <Layout>

        <main class="px-2 flex-1 flex-col flex justify-center items-center mt-12 ">
          <h1 class="text-6xl mb-12 mt-12">
            About Page
          </h1>

          <p class="text-3xl mb-8 mt-10">
            You can acces from this page to our articles pages or our contact pages
          </p>
          <div class="flex items-center justify-center flex-wrap max-w-4xl rounded-3xl" id="article">
            <a href="http://localhost:3000/articles" class="m-4 p-6 text-left rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 ease-linear max-w-xs hover:bg-sky-500 hover:ring-sky-500" > <h2 class="text-3xl mb-2">Articles</h2> Find all of our recent Articles</a>
            <a href="http://localhost:3000/contacts" class="m-4 p-6 text-left rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 ease-linear max-w-xs hover:bg-sky-500 hover:ring-sky-500" > <h2 class="text-3xl mb-2">Contacts</h2> Learn more about us</a>
          </div>


        </main>

      </Layout>
    </div>
  )
}
