import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BoxPlotProps {
    q3: number;
    q1: number;
    mediana: number;
}

const BoxPlot: React.FC<BoxPlotProps> = ({ q3, q1, mediana }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const width = 400;
        const height = 200;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const boxWidth = 50;
        const center = (width - margin.left - margin.right) / 2;

        const svgElement = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const g = svgElement.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Calcular los bigotes basado en 1.5 veces el rango intercuartil
        const iqr = q3 - q1;
        const lowerWhisker = Math.max(0, q1 - 1.5 * iqr);
        const upperWhisker = q3 + 1.5 * iqr;

        const y = d3.scaleLinear()
            .domain([lowerWhisker, upperWhisker])
            .range([height - margin.top - margin.bottom, 0]);

        g.append('g')
            .call(d3.axisLeft(y));

        // Línea vertical
        g.append("line")
            .attr("x1", center)
            .attr("x2", center)
            .attr("y1", y(lowerWhisker))
            .attr("y2", y(upperWhisker))
            .attr("stroke", "black");

        // Caja del boxplot
        g.append("rect")
            .attr("x", center - boxWidth / 2)
            .attr("y", y(q3))
            .attr("height", y(q1) - y(q3))
            .attr("width", boxWidth)
            .attr("stroke", "black")
            .style("fill", "#69b3a2");

        // Línea para la mediana
        g.append("line")
            .attr("x1", center - boxWidth / 2)
            .attr("x2", center + boxWidth / 2)
            .attr("y1", y(mediana))
            .attr("y2", y(mediana))
            .attr("stroke", "black");

        // Línea para el mínimo
        g.append("line")
            .attr("x1", center - boxWidth / 4)
            .attr("x2", center + boxWidth / 4)
            .attr("y1", y(lowerWhisker))
            .attr("y2", y(lowerWhisker))
            .attr("stroke", "black");

        // Línea para el máximo
        g.append("line")
            .attr("x1", center - boxWidth / 4)
            .attr("x2", center + boxWidth / 4)
            .attr("y1", y(upperWhisker))
            .attr("y2", y(upperWhisker))
            .attr("stroke", "black");

        return () => {
            svgElement.selectAll('*').remove();
        };
    }, [q3, q1, mediana]);

    return (
        <svg ref={svgRef} style={{ border: '1px solid black' }}></svg>
    );
};

export default BoxPlot;