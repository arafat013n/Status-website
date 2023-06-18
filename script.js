document.addEventListener("DOMContentLoaded", () => {
  // Fetch JSON data from file
  fetch('statuses.json')
    .then(response => response.json())
    .then(data => {
      // Get statuses and translations from JSON data
      const statuses = data.statuses;
      const translations = data.translations;

      // Generate status cards
      const statusCardsContainer = document.getElementById("status-cards");

      Object.entries(statuses).forEach(([status, translation]) => {
        const card = document.createElement("div");
        card.className = "status-card";

        const content = document.createElement("div");
        content.innerHTML = `
          <p class="text-lg">${status}</p>
        `;

        const languageButton = document.createElement("button");
        languageButton.className = "language-button";
        languageButton.textContent = "Bangla";
        languageButton.addEventListener("click", () => {
          toggleLanguage(languageButton, content, status, translation);
        });

        const copyButton = document.createElement("button");
        copyButton.className = "copy-button";
        copyButton.textContent = "Copy";
        copyButton.addEventListener("click", () => {
          copyToClipboard(copyButton, content);
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttonContainer.appendChild(languageButton);
        buttonContainer.appendChild(copyButton);

        card.appendChild(content);
        card.appendChild(buttonContainer);

        statusCardsContainer.appendChild(card);
      });

      // Search functionality
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        Array.from(statusCardsContainer.children).forEach(card => {
          const cardContent = card.getElementsByTagName("p")[0].textContent.toLowerCase();

          if (cardContent.includes(searchTerm)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });

      // Function to toggle the language of the status
      function toggleLanguage(languageButton, content, status, translation) {
        if (languageButton.textContent === "Bangla") {
          content.getElementsByTagName("p")[0].textContent = translation;
          languageButton.textContent = "English";
        } else {
          content.getElementsByTagName("p")[0].textContent = status;
          languageButton.textContent = "Bangla";
        }
      }

      // Function to copy status text to clipboard
      function copyToClipboard(button, content) {
        const status = content.getElementsByTagName("p")[0].textContent;
        const textToCopy = button.textContent === "Bangla" ? status : status;

        const dummyTextarea = document.createElement('textarea');
        dummyTextarea.value = textToCopy;
        document.body.appendChild(dummyTextarea);
        dummyTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(dummyTextarea);
        alert('Copied to clipboard: ' + textToCopy);
      }
    });
});