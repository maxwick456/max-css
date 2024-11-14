class CustomModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create modal structure
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none; /* Hide by default */
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    justify-content: center;
                    align-items: center;
                }
                .modal {
                    color: black;
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    width: 100%;
                }
                .close {
                    cursor: pointer;
                    float: right;
                    font-size: 20px;
                }
            </style>
            <div class="modal">
                <span class="close">&times;</span>
                <slot></slot>
            </div>
        `;

        this.closeButton = this.shadowRoot.querySelector('.close');
        this.closeButton.addEventListener('click', () => this.close());
    }

    connectedCallback() {
        // Listen for events to open the modal
        document.addEventListener('open-modal', () => this.open());
    }

    disconnectedCallback() {
        document.removeEventListener('open-modal', () => this.open());
    }

    open() {
        this.style.display = 'flex'; // Show the modal
    }

    close() {
        this.style.display = 'none'; // Hide the modal
    }
}

// Define the custom element
customElements.define('custom-modal', CustomModal);

// Setup button event listener
const openModalBtn = document.getElementById('openModal');
openModalBtn.addEventListener('click', () => {
    // Dispatch an event to open the modal
    const event = new Event('open-modal');
    document.dispatchEvent(event);
});

class CustomHorizontalLine extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create the horizontal line
        const line = document.createElement('hr');
        line.style.border = `none`;
        line.style.borderTop = `${this.getAttribute('thickness') || '1px'} solid ${this.getAttribute('color') || 'black'}`;
        line.style.margin = '0';

        this.shadowRoot.appendChild(line);
    }
}

// Define the custom element
customElements.define('custom-horizontal-line', CustomHorizontalLine);

class CustomForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create style element
        const style = document.createElement('style');
        style.textContent = `
            /* General styles for the page */
            :host {
                color: black;
                display: block;
                width: 200px;
                margin: 20px 0;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            input {
                display: block;
                margin: 10px 0;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            button {
                padding: 10px 15px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background-color: #218838;
            }
        `;

        // Create form elements
        const form = document.createElement('form');

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Name:';
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('placeholder', 'Enter your name');

        const emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';
        const emailInput = document.createElement('input');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('placeholder', 'Enter your email');

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';

        // Append elements to the form
        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(emailLabel);
        form.appendChild(emailInput);
        form.appendChild(submitButton);

        // Handle form submission
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            const name = nameInput.value;
            const email = emailInput.value;
            alert(`Name: ${name}\nEmail: ${email}`);
        });

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(form);
    }
}

// Define the custom element
customElements.define('custom-form', CustomForm);

class CustomCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create style element
        const style = document.createElement('style');
        style.textContent = `
            .card {
                border: 1px solid #ccc;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 300px;
                margin: 20px;
            }
            .card img {
                width: 100%;
                height: auto;
            }
            .card .content {
                padding: 15px;
            }
            .card h2 {
                margin: 0 0 10px;
            }
            .card button {
                padding: 10px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            .card button:hover {
                background-color: #0056b3;
            }
        `;

        // Create card elements
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.setAttribute('src', this.getAttribute('image'));
        img.setAttribute('alt', 'Card image');

        const content = document.createElement('div');
        content.setAttribute('class', 'content');

        const title = document.createElement('h2');
        title.textContent = this.getAttribute('title');

        const textContent = document.createElement('p');
        textContent.textContent = this.getAttribute('content');

        const button = document.createElement('button');
        button.textContent = 'Learn More';
        button.addEventListener('click', () => {
            alert(`You clicked on the card titled: "${title.textContent}"`);
        });

        // Append elements to the card
        content.appendChild(title);
        content.appendChild(textContent);
        card.appendChild(img);
        card.appendChild(content);
        card.appendChild(button);

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(card);
    }
}

// Define the custom element
customElements.define('custom-card', CustomCard);

class SmallCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create style element
        const style = document.createElement('style');
        style.textContent = `
            .card {
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 10px;
                max-width: 200px;
                margin: 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .card img {
                width: 100%;
                border-radius: 5px;
            }
            .card h3 {
                margin: 0 0 5px;
                font-size: 1.2em;
            }
            .card p {
                margin: 0 0 10px;
                font-size: 0.9em;
            }
            .card button {
                padding: 5px 10px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 0.9em;
            }
            .card button:hover {
                background-color: #0056b3;
            }
        `;

        // Create card elements
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.src = this.getAttribute('image');

        const title = document.createElement('h3');
        title.textContent = this.getAttribute('title');

        const textContent = document.createElement('p');
        textContent.textContent = this.getAttribute('content');

        const button = document.createElement('button');
        button.textContent = 'Click Me';
        button.addEventListener('click', () => {
            alert(`You clicked on the card titled: "${title.textContent}"`);
        });

        // Append elements to the card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(textContent);
        card.appendChild(button);

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(card);
    }
}

// Define the custom element
customElements.define('small-card', SmallCard);