document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE SYNCHRONIZATION ---
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const root = document.documentElement;

    // Check for cached preference or system settings
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);
    } else {
        root.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = root.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            root.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }

    // --- INTERACTIVE CUSTOMER SUPPORT FORM & TICKETING SYSTEM ---
    const supportForm = document.getElementById("supportForm");
    const successState = document.getElementById("successState");
    const resetFormBtn = document.getElementById("resetFormBtn");

    if (supportForm) {
        supportForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop standard HTTP POST reloads

            // 1. Extract values for verification
            const name = document.getElementById("supportName").value.trim();
            const email = document.getElementById("supportEmail").value.trim();
            const category = document.getElementById("supportCategory").value;
            const message = document.getElementById("supportMessage").value.trim();

            // 2. Perform production integrity validation
            if (!name || !email || !category || !message) {
                alert("Please complete all ticketing form fields before submitting.");
                return;
            }

            // Show submitting state on submit button
            const submitBtn = supportForm.querySelector(".submit-btn");
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending Ticket...</span><i data-lucide="loader" class="animate-spin"></i>`;
            if (window.lucide) { window.lucide.createIcons(); }

            // 3. Asynchronously post support request to FormSubmit (Zero-Database Overhead)
            fetch("https://formsubmit.co/ajax/chaudaryglobal@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "AppName": "HabitArena",
                    "Customer Name": name,
                    "Customer Email": email,
                    "Support Category": category.toUpperCase(),
                    "Ticket Message": message
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("FormSubmit submission failed.");
            })
            .then(data => {
                // 4. Smoothly switch interface states
                supportForm.classList.add("hidden");
                successState.classList.remove("hidden");
            })
            .catch(error => {
                console.error(error);
                alert("Could not process form. Falling back: Opening your local email application...");
                
                // Fallback: mailto link
                const mailtoUrl = `mailto:chaudaryglobal@gmail.com?subject=HabitArena [${category.toUpperCase()}] Support&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
                window.location.href = mailtoUrl;
            })
            .finally(() => {
                // Reset button text
                submitBtn.innerHTML = originalBtnHtml;
                if (window.lucide) { window.lucide.createIcons(); }
            });
        });
    }

    if (resetFormBtn && supportForm) {
        resetFormBtn.addEventListener("click", () => {
            // Reset form inputs and toggle states back
            supportForm.reset();
            successState.classList.add("hidden");
            supportForm.classList.remove("hidden");
        });
    }
});
