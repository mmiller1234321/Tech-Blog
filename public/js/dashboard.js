const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  try {
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to create a post');
      }
    }
  } catch (error) {
    console.error('Error creating post:', error.message);
    alert('Failed to create a post');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error('Failed to delete a post');
      }
    } catch (error) {
      console.error('Error deleting post:', error.message);
      alert('Failed to delete a post');
    }
  }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

document.querySelector('.del-post-form').addEventListener('click', delButtonHandler);
