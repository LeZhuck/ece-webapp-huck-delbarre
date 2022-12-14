function Navbar(){
    return (
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 bg-slate-400" >
        <div className="flex flex-wrap items-center mx-auto max-w-screen-xl">
            <a href="https://adfs.inseecgateway.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aece.campusonline.me%3ainseec&wctx=https%3a%2f%2fece.campusonline.me%2ffr-fr%2f_layouts%2f15%2fAuthenticate.aspx%3fSource%3d%252Ffr%252Dfr%252FPages%252Fhome%252Easpx" className="flex items-center mr-20">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">WebTech</span>
            </a>
            <div className="hidden items-center w-full lg:flex lg:w-auto lg:order-1 ml-20">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-white" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="/about" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-white">About</a>
                    </li>
                    <li>
                        <a href="/contacts" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-white">Contacts</a>
                    </li>
                    <li>
                        <a href="/articles" className="block py-2 pr-4 pl-3 text-gray-700 hover:text-white">Articles</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}
export default Navbar;