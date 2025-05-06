// Maskot Mesajları
const maskotMesajlari = [
  "Şekerinizi ölçtünüz mü? Şimdi harika bir zaman! 🕒",
  "Su içmeyi unutmayalım, vücudumuz susuz kalmasın 💧",
  "Bugün 5 dakika egzersiz yapmayı deneyin! 🏃‍♂️",
  "HbA1c değeriniz için doktorunuzla konuşmayı unutmayın 👨‍⚕️",
  "Ara öğünler diyabet dostunuzdur 🍎",
  "Insülin dozunuzu düzenli alıyorsunuz değil mi? 💉"
];
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initGlucoseChart();
    initTimeInRangeChart();
    initCalendar();
    setupMedicationModal();
    setupEventListeners();
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Diğer mevcut fonksiyonlarınız...
    initGlucoseChart();
    initTimeInRangeChart();
    initCalendar();
    setupMedicationModal();
    setupEventListeners();
    
    // Maskot fonksiyonunu EKLEYİN
    maskotBaslat();
  });
  
  // EN SONA bu fonksiyonu ekleyin
  function maskotBaslat() {
    const maskot = document.getElementById('maskot-asistan');
    const balon = document.querySelector('.konusma-balonu');
    const mesaj = document.getElementById('maskot-mesaji');
    const kapatBtn = document.getElementById('kapat-baloon');
  
    function rastgeleMesajGoster() {
      const rastgeleIndex = Math.floor(Math.random() * maskotMesajlari.length);
      mesaj.textContent = maskotMesajlari[rastgeleIndex];
      balon.classList.remove('hidden');
    }
  
    maskot.addEventListener('click', () => {
      maskot.classList.remove('hidden');
      rastgeleMesajGoster();
    });
  
    kapatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      balon.classList.add('hidden');
    });
  
    setInterval(() => {
      if(!balon.classList.contains('hidden')) {
        rastgeleMesajGoster();
      }
    }, 120000);
  
    setTimeout(() => {
      maskot.classList.remove('hidden');
      rastgeleMesajGoster();
    }, 10000);
  }
  document.addEventListener('DOMContentLoaded', (function() {
    // Tüm kodunuzu buraya alın
    // Başlatma işlemleri burada
  })());
  
  function initGlucoseChart() {
    try {
      const glucoseCtx = document.getElementById('glucoseChart').getContext('2d');
      if (!glucoseCtx) {
        console.error('Glucose chart canvas not found');
        return;
      }
  
      new Chart(glucoseCtx, {
        type: 'line',
        data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
          datasets: [{
            label: 'Kan Şekeri (mg/dL)',
            data: [110, 105, 142, 158, 145, 132, 121, 135, 210],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y} mg/dL`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 70,
              max: 250,
              ticks: {
                callback: function(value) {
                  return value + ' mg/dL';
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing glucose chart:', error);
    }
  }
  
  function initTimeInRangeChart() {
    try {
      const timeInRangeOptions = {
        series: [82, 2, 16],
        chart: {
          type: 'donut',
          height: 150
        },
        colors: ['#10b981', '#f59e0b', '#ef4444'],
        labels: ['Hedef Aralık', 'Hipoglisemi', 'Hiperglisemi'],
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Hedef Aralık',
                  formatter: function(w) {
                    return '82%';
                  }
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
  
      const timeInRangeChart = new ApexCharts(document.querySelector("#timeInRangeChart"), timeInRangeOptions);
      timeInRangeChart.render();
    } catch (error) {
      console.error('Error initializing time in range chart:', error);
    }
  }
  
  function initCalendar() {
    try {
      const calendarEl = document.getElementById('calendar');
      if (!calendarEl) {
        console.error('Calendar element not found');
        return;
      }
  
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
          {
            title: 'Endokrinoloji Kontrolü',
            start: new Date(new Date().setDate(new Date().getDate() + 1)),
            end: new Date(new Date().setDate(new Date().getDate() + 1)),
            color: '#ec4899',
            textColor: '#ffffff'
          },
          {
            title: 'HbA1c Testi',
            start: '2023-06-15',
            color: '#6366f1',
            textColor: '#ffffff'
          },
          {
            title: 'Göz Muayenesi',
            start: '2023-06-20',
            color: '#10b981',
            textColor: '#ffffff'
          }
        ],
        eventClick: function(info) {
          info.jsEvent.preventDefault();
          alert(`Randevu Detayı: ${info.event.title}\nTarih: ${info.event.start.toLocaleString()}`);
        },
        locale: 'tr'
      });
  
      calendar.render();
    } catch (error) {
      console.error('Error initializing calendar:', error);
    }
  }
  
  function setupMedicationModal() {
    try {
      const addMedicationBtn = document.getElementById('addMedicationBtn');
      const closeMedicationModal = document.getElementById('closeMedicationModal');
      const cancelMedication = document.getElementById('cancelMedication');
      const addMedicationModal = document.getElementById('addMedicationModal');
  
      if (!addMedicationBtn || !closeMedicationModal || !cancelMedication || !addMedicationModal) {
        console.error('Medication modal elements not found');
        return;
      }
  
      // Show modal
      addMedicationBtn.addEventListener('click', () => {
        addMedicationModal.classList.remove('hidden');
      });
  
      // Hide modal
      const hideModal = () => {
        addMedicationModal.classList.add('hidden');
      };
  
      closeMedicationModal.addEventListener('click', hideModal);
      cancelMedication.addEventListener('click', hideModal);
  
      // Close modal when clicking outside
      addMedicationModal.addEventListener('click', (e) => {
        if (e.target === addMedicationModal) {
          hideModal();
        }
      });
    } catch (error) {
      console.error('Error setting up medication modal:', error);
    }
  }
  
  function setupEventListeners() {
    try {
      // Period selector for glucose tracking
      const periodButtons = document.querySelectorAll('#glucose .flex.space-x-2 button');
      periodButtons.forEach(button => {
        button.addEventListener('click', function() {
          periodButtons.forEach(btn => {
            btn.classList.remove('bg-indigo-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
          });
          this.classList.remove('bg-gray-200', 'text-gray-700');
          this.classList.add('bg-indigo-600', 'text-white');
          
          // Here you would typically fetch new data based on the selected period
          console.log('Selected period:', this.textContent.trim());
        });
      });
  
      // Tab switching for medication
      const medicationTabs = document.querySelectorAll('#medication .flex.border-b button');
      medicationTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          medicationTabs.forEach(t => {
            t.classList.remove('border-b-2', 'border-indigo-600', 'text-indigo-600');
            t.classList.add('text-gray-500', 'hover:text-indigo-600');
          });
          this.classList.add('border-b-2', 'border-indigo-600', 'text-indigo-600');
          this.classList.remove('text-gray-500', 'hover:text-indigo-600');
          
          // Here you would typically show different content based on the selected tab
          console.log('Selected tab:', this.textContent.trim());
        });
      });
  
      // Add appointment button
      const addAppointmentBtn = document.getElementById('addAppointmentBtn');
      if (addAppointmentBtn) {
        addAppointmentBtn.addEventListener('click', function() {
          alert('Yeni randevu ekleme formu burada gösterilecek');
          // Implement actual appointment adding functionality here
        });
      }
    } catch (error) {
      console.error('Error setting up event listeners:', error);
    }
  }
  
  // Utility function to fetch data from API (example)
  async function fetchGlucoseData(period = 'daily') {
    try {
      // In a real app, you would make an actual API call here
      // const response = await fetch(`/api/glucose?period=${period}`);
      // const data = await response.json();
      // return data;
      
      // Mock data for demonstration
      return {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        values: [110, 105, 142, 158, 145, 132, 121, 135, 210]
      };
    } catch (error) {
      console.error('Error fetching glucose data:', error);
      return { labels: [], values: [] };
    }
  }