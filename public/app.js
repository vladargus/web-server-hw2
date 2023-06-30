document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'edit') {
    event.target.closest('.note-block').classList.add('d-none')
    event.target
      .closest('li')
      .querySelector('.edit-block')
      .classList.remove('d-none')
  }

  if (event.target.dataset.type === 'save') {
    const title = event.target
      .closest('.edit-block')
      .querySelector('input')
      .value.trim()
    if (title) {
      update(event.target.dataset.id, title).then(() => {
        event.target.closest('li').querySelector('span').innerHTML = title
        event.target.closest('.edit-block').classList.add('d-none')
        event.target
          .closest('li')
          .querySelector('.note-block')
          .classList.remove('d-none')
      })
    }
  }

  if (event.target.dataset.type === 'cancel') {
    event.target.closest('.edit-block').classList.add('d-none')
    event.target
      .closest('li')
      .querySelector('.note-block')
      .classList.remove('d-none')
    event.target.closest('.edit-block').querySelector('input').value =
      event.target.closest('li').querySelector('span').innerText
  }
})

async function update(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
}

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}
