document.addEventListener('DOMContentLoaded', () => {
    fetch('./entries.json')
        .then(response => response.json())
        .then(entries => {
            const blogContainer = document.getElementById('blog-container');
            entries.forEach(entry => {
                blogContainer.appendChild(createBlogEntryElement(entry));
            });
        })
        .catch(error => {
            console.error('Error loading blog entries:', error);
        });

    setupDarkModeToggle();
});

function createBlogEntryElement(entry) {
    // Main container for the blog entry
    const container = document.createElement('article');
    container.classList.add('mb-8', 'p-4', 'rounded-lg', 'shadow-md', 'transition-all', 'cursor-pointer', 'bg-white', 'dark:bg-gray-700');

    // Title that toggles the rest of the content
    const title = document.createElement('h2');
    title.classList.add('text-2xl', 'font-bold', 'dark:text-white');
    title.textContent = entry.title;
    title.onclick = () => details.classList.toggle('hidden');

    // Container for date, name, and body, which are hidden initially
    const details = document.createElement('div');
    details.classList.add('hidden');

    // Date of the blog post
    const date = document.createElement('p');
    date.classList.add('text-sm', 'text-gray-500', 'dark:text-gray-400');
    date.textContent = `Date: ${entry.date}`;

    // Author's name
    const name = document.createElement('p');
    name.classList.add('text-sm', 'text-gray-500', 'dark:text-gray-400');
    name.textContent = `Author: ${entry.name}`;

    // Body of the blog post, rendered from Markdown
    const body = document.createElement('div');
    body.classList.add('prose', 'dark:prose-dark', 'mt-4');
    body.innerHTML = marked.parse(entry.body);

    // Append the date, name, and body to the details container
    details.appendChild(date);
    details.appendChild(name);
    details.appendChild(body);

    // Append the title and details container to the main container
    container.appendChild(title);
    container.appendChild(details);

    return container;
}

function setupDarkModeToggle() {
    const toggle = document.getElementById('dark-mode-toggle');
    toggle.addEventListener('click', () => {
        // Toggle the class on the html element
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check for saved user preference on dark mode, and apply it
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark');
    }
}