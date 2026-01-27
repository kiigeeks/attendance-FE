import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const dateIndoNow = () => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(today);

    return formattedDate;
}

// Fungsi untuk format tanggal dan waktu menjadi 20 Agustus 2022
export const dateIndo = (formatDate) => {
    // Buat objek Date dari string ISO
    const date = new Date(formatDate);

    // Ambil hari, bulan, dan tahun
    const day = date.getUTCDate(); // Mendapatkan tanggal
    const year = date.getUTCFullYear(); // Mendapatkan tahun

    // Array nama bulan dalam bahasa Indonesia
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const month = monthNames[date.getUTCMonth()]; // Mendapatkan nama bulan dari array

    // Gabungkan hasil tanggal, bulan, dan tahun
    return `${day} ${month} ${year}`;

    // const tanggalFormatted = format(new Date(formatDate), 'dd MMMM yyyy', { locale: id });
    // return tanggalFormatted;
}

export const timeIndo = (timestamp) => {
    const date = new Date(timestamp);

    // Ambil jam dan menit
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Mengambil jam dalam format dua digit
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Mengambil menit dalam format dua digit

    // Format waktu sebagai input time
    const inputTime = `${hours}:${minutes}`;

    return  inputTime
}

export const timestampToTime = (timestamp) => {
    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format waktu sebagai input time
    const inputTime = `${hours}:${minutes}`;

    // Kembalikan objek dengan input date dan input time
    return  inputTime
}

export const timestampToDate = (timestamp) => {
    const dateValue = new Date(timestamp);
    
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(dateValue);

    return formattedDate
}

// Fungsi untuk menampilkan birthday menjadi 20 Agustus
export const convertBirthdayFormat = (birthday) => {
    const tanggalFormatted = format(new Date(birthday), 'dd MMMM', { locale: id });
    return tanggalFormatted;
};

export const getStatusRewards = (status) => {
    switch (status) {
        case 'failed':
            return 'bg-red-500';
        case 'success':
            return 'bg-green-500';
        case 'pending':
            return 'bg-yellow-500';
        default:
            return 'bg-gray-500';
    }
}

export const normalizeDateTimeFromDB = (dateFromDB) => {
    const dateObj = new Date(dateFromDB);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}:${seconds}`
    };
};

export const createTimeStamp = (inputDate, inputTime) => {
    // Pisahkan nilai tanggal dan waktu
    const [year, month, day] = inputDate.split('-'); // Pisahkan tahun, bulan, dan hari
    const [hour, minute] = inputTime.split(':'); // Pisahkan jam dan menit
  
    // Buat objek Date dari nilai tanggal dan waktu
    const dateTime = new Date(year, month - 1, day, hour, minute);
  
    // const timestamp = dateTime.getTime(); // Nilai timestamp dalam milidetik
    
    // return timestamp// Format menjadi string datetime-local: "YYYY-MM-DDTHH:MM"
    const formattedDateTime = new Date(new Date(dateTime).getTime() + (7 * 60 * 60 * 1000)).toISOString().slice(0, -1) // Potong ke format "YYYY-MM-DDTHH:MM"
    // const formattedDateTime = dateTime.toISOString().slice(0, -1); // Potong ke format "YYYY-MM-DDTHH:MM"
  
    return formattedDateTime; // Return nilai yang cocok untuk input datetime-local
}

// Fungsi untuk menghitung jarak antara dua koordinat dalam meter
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius bumi dalam meter
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Hasil dalam meter
};

export const checkHireDate = (hireDate, isPermanent) => {
    const hireDateObj = new Date(hireDate);
    const currentDate = new Date();

    // Hitung selisih tahun antara tanggal saat ini dan hire date
    const diffInYears = currentDate.getFullYear() - hireDateObj.getFullYear();

    // Jika sudah lebih dari 1 tahun, atau jika tepat 1 tahun tapi lebih dari hari yang sama di bulan hire date
    if (diffInYears > 1 || (diffInYears === 1 && currentDate >= new Date(hireDateObj.setFullYear(currentDate.getFullYear())))) {
        return true;
    }

    if (isPermanent) {
        return true;
    }
    return false;
}

export const buildDateTime = (baseDate, timeString) => {
    const [h, m] = timeString.split(":").map(Number);
    const d = new Date(baseDate);
    d.setHours(h, m, 0, 0);
    return d;
};


let navigateInstance = null;

export const setNavigate = (navigate) => {
    navigateInstance = navigate;
};

export const navigateTo = (path) => {
    if (navigateInstance) {
        navigateInstance(path);
    }
};