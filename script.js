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
            e.preventDefault(); // Stop standard HTTP reloads

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

            // 3. Construct premium, highly readable ticket details
            const emailSubject = `HabitArena Support Ticket [${category.toUpperCase()}]`;
            
            let emailBody = `--- HABITARENA CUSTOMER SUPPORT TICKET ---\r\n\r\n`;
            emailBody += `Customer Name: ${name}\r\n`;
            emailBody += `Customer Email: ${email}\r\n`;
            emailBody += `Issue Category: ${category.toUpperCase()}\r\n`;
            emailBody += `Submitted On: ${new Date().toLocaleString()}\r\n\r\n`;
            emailBody += `---------------- MESSAGE ----------------\r\n`;
            emailBody += `${message}\r\n`;
            emailBody += `-----------------------------------------\r\n\r\n`;
            emailBody += `(Please do not modify this text block. Simply press SEND in your email application to file this ticket with Chaudary Global.)`;

            // Encode the parameters for mailto
            const mailtoUrl = `mailto:chaudaryglobal@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            // 4. Trigger local email client
            window.location.href = mailtoUrl;

            // 5. Smoothly transition form UI states to Success
            supportForm.classList.add("hidden");
            successState.classList.remove("hidden");
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
