function Footer() {
    return (

        <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 mx-auto max-w-screen-xl mt-11">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://adfs.inseecgateway.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aece.campusonline.me%3ainseec&wctx=https%3a%2f%2fece.campusonline.me%2ffr-fr%2f_layouts%2f15%2fAuthenticate.aspx%3fSource%3d%252Ffr%252Dfr%252FPages%252Fhome%252Easpx" className="hover:underline">WebTech</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="/about" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="/contacts" className="hover:underline">Contact</a>
        </li>
    </ul>
</footer>

    );
}

export default Footer;