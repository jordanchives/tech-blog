document.addEventListener('DOMContentLoaded', () => {
    const editHandler = async (event) => {
        event.preventDefault();

        const title = document.querySelector("#title").value.trim();
        const content = document.querySelector("#content").value.trim();
        const id = window.location.pathname.split('/').pop(); // Assuming the id is in the URL

        if (title && content && id) {
            const response = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title, content }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Failed to update post");
            }
        }
    };

    const deleteHandler = async () => {
        const id = window.location.pathname.split('/').pop();

        if (id) {
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Failed to delete post");
            }
        }
    };

    document.querySelector("#edit-form").addEventListener("submit", editHandler);
    document.querySelector("#delete").addEventListener("click", deleteHandler);
});
