document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tema = document.getElementById('tema').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const dia = document.getElementById('dia').value;

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    
    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = `Tema: ${tema}, descripcion: ${descripcion}, Fecha: ${fecha}, Hora: ${hora}, Día: ${dia}`;
    
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', function() {
        taskList.removeChild(li);
    });

    li.appendChild(taskText);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    document.getElementById('taskForm').reset();
});

document.getElementById('downloadPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const tasks = document.querySelectorAll('#taskList li .task-text');
    
    const pdfDoc = new jsPDF();

    pdfDoc.setFont('helvetica', 'bold');
    pdfDoc.setFontSize(20);
    pdfDoc.text('Lista de Tareas', 105, 20, { align: 'center' });

    pdfDoc.setFont('helvetica', 'normal');
    pdfDoc.setFontSize(12);
    
    let y = 30;
    tasks.forEach((task, index) => {
        if (y > 280) {  // Create a new page if the text goes beyond the limit
            pdfDoc.addPage();
            y = 30;
        }
        const taskText = task.textContent.split(', ');
        pdfDoc.text(`Tarea ${index + 1}:`, 10, y);
        y += 10;
        taskText.forEach(line => {
            pdfDoc.text(line, 10, y);
            y += 10;
        });
        y += 10;  // Add extra space between tasks
    });

    pdfDoc.save('tareas.pdf');
});


////