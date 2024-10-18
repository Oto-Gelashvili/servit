'use client';

import { useState } from 'react';
import './Services.css';
import ServicesPage from '../components/ServicesStuff/ServicesList/ServicesPage';
import Sorter from '../utils/sorter';

export default function Services() {
  const [sortType, setSortType] = useState('Sort Options');

  const handleSortChange = (newSortType) => {
    setSortType(newSortType);
  };

  return (
    <main className="services-main">
      <h1 className="service-title">
        <span>ServIt Up:</span> <br></br> Let Skills Meet Opportunities!
      </h1>
      <Sorter onSortChange={handleSortChange} />
      <ServicesPage sortType={sortType} />
    </main>
  );
}
