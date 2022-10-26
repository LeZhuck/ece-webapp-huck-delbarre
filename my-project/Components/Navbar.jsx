function Navbar(){
    return (
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 bg-slate-400" >
        <div class="flex flex-wrap items-center mx-auto max-w-screen-xl">
            <a href="https://adfs.inseecgateway.com/adfs/ls/?wa=wsignin1.0&wtrealm=urn%3aece.campusonline.me%3ainseec&wctx=https%3a%2f%2fece.campusonline.me%2ffr-fr%2f_layouts%2f15%2fAuthenticate.aspx%3fSource%3d%252Ffr%252Dfr%252FPages%252Fhome%252Easpx" class="flex items-center mr-20">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">WebTech</span>
            </a>
            <div class="hidden items-center w-full lg:flex lg:w-auto lg:order-1 ml-20">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
                    <li>
                        <a href="/" class="block py-2 pr-4 pl-3 text-gray-700" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="/about" class="block py-2 pr-4 pl-3 text-gray-700">About</a>
                    </li>
                    <li>
                        <a href="/contacts" class="block py-2 pr-4 pl-3 text-gray-700">Contacts</a>
                    </li>
                    <li>
                        <a href="/articles" class="block py-2 pr-4 pl-3 text-gray-700">Articles</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}
export default Navbar;