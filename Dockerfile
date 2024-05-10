# เลือกเวอร์ชันของ Node.js ที่ต้องการใช้
FROM node:14-alpine

# ตั้งค่าไดเรกทอรีทำงาน
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยังโฟลเดอร์ทำงาน
COPY package*.json ./

# ติดตั้ง dependencies โดยใช้ npm
RUN npm install

# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์โปรเจ็กต์ React ไปยังโฟลเดอร์ทำงาน
COPY . .

# บอก Docker container ให้ใช้พอร์ตที่ 3000
EXPOSE 3000

# เมื่อ Docker container ถูกสร้างขึ้น ให้รันแอปพลิเคชัน React
CMD ["npm", "start"]