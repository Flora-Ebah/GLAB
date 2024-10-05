import React, { useState } from 'react';
import { Calendar, Badge } from 'antd';
import { ScheduleOutlined } from '@ant-design/icons';

const Calendrier = () => {
  const [events, setEvents] = useState([
    { date: '2024-03-15', type: 'success', content: 'Entretien avec candidat' },
    { date: '2024-03-20', type: 'warning', content: 'Date limite de candidature' },
    { date: '2024-03-25', type: 'error', content: 'Réunion d\'équipe' },
  ]);

  const dateCellRender = (value) => {
    const listData = events.filter(event => event.date === value.format('YYYY-MM-DD'));
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const handleSelect = (date) => {
    console.log('Date sélectionnée:', date.format('YYYY-MM-DD'));
    // Ici, vous pouvez ajouter la logique pour gérer la sélection d'une date
  };

  return (
    <div className="calendrier-container">
      <h1><ScheduleOutlined /> Calendrier des événements RH</h1>
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Calendrier;
