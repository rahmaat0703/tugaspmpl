let currentNoteId = null; // Variabel untuk menyimpan ID catatan yang sedang diedit

document.getElementById('saveButton').addEventListener('click', saveNote);
document.getElementById('viewButton').addEventListener('click', viewAllNotes);
document.getElementById('closeButton').addEventListener('click', closeNotes); // Tambahkan listener untuk tombol tutup

// Fungsi untuk menampilkan pesan alert
function showAlert(message) {
    document.getElementById('alertMessage').innerText = message; // Menetapkan pesan ke modal
    $('#customAlert').modal('show'); // Menampilkan modal alert kustom
}

// Fungsi untuk menyimpan catatan
function saveNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (currentNoteId) {
        fetch('update_note.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: currentNoteId, title, content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Catatan berhasil diperbarui!'); // Ganti alert dengan showAlert
                resetForm();
                viewAllNotes();
            } else {
                showAlert('Gagal memperbarui catatan.'); // Ganti alert dengan showAlert
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        fetch('save_note.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showAlert('Catatan berhasil disimpan!'); // Ganti alert dengan showAlert
                resetForm();
                viewAllNotes();
            } else {
                showAlert('Gagal menyimpan catatan.'); // Ganti alert dengan showAlert
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Fungsi untuk mereset form
function resetForm() {
    currentNoteId = null;
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
}

// Fungsi untuk melihat semua catatan
function viewAllNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Kosongkan daftar catatan
    notesList.style.display = 'block'; // Tampilkan daftar catatan

    fetch('view_notes.php')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            data.forEach(note => {
                const noteCard = `
                    <div class="card mt-2" id="note-${note.id}">
                        <div class="card-header"><h5>${note.title}</h5></div>
                        <div class="card-body">
                            <p>${note.content.replace(/\n/g, '<br>')}</p>
                            <button class="btn btn-warning btn-sm" onclick="showEditForm(${note.id}, '${note.title}', \`${note.content}\`)">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteNote(${note.id})">Hapus</button>
                        </div>
                    </div>
                `;
                notesList.innerHTML += noteCard;
            });
        } else {
            notesList.innerHTML = '<p>Tidak ada catatan ditemukan.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching notes:', error);
    });
}

// Fungsi untuk menutup daftar catatan
function closeNotes() {
    const notesList = document.getElementById('notesList');
    notesList.style.display = 'none'; // Sembunyikan daftar catatan
}

// Fungsi untuk menghapus catatan
function deleteNote(id) {
    fetch('delete_note.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert('Catatan berhasil dihapus!'); // Ganti alert dengan showAlert
            viewAllNotes();
        } else {
            showAlert('Gagal menghapus catatan.'); // Ganti alert dengan showAlert
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Fungsi untuk menampilkan form edit
function showEditForm(id, title, content) {
    currentNoteId = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
}
