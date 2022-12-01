import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

    items: MenuItem[];


    chartData: any;

    chartOptions: any;

    subscription: Subscription;


    constructor() { }

    ngOnInit() {

 
    }

    updateChartOptions() {

        this.applyDarkTheme();


    }

    applyDarkTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };
    }

    applyLightTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };
    }
}
