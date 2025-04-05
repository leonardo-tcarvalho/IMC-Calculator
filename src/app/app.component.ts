import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <header>
        <h1>Calculadora de IMC</h1>
        <p class="subtitle">Índice de Massa Corporal</p>
      </header>

      <div class="card">
        <div class="calculator">
          <div class="form-group">
            <label for="peso">Peso (kg):</label>
            <input
              type="number"
              id="peso"
              step="0.01"
              min="0.1"
              required
              placeholder="Ex: 70.5"
            />
          </div>

          <div class="form-group">
            <label for="altura">Altura (m):</label>
            <input
              type="number"
              id="altura"
              step="0.01"
              min="0.1"
              max="3"
              required
              placeholder="Ex: 1.75"
            />
          </div>

          <button (click)="calcularIMC()">Calcular IMC</button>
        </div>

        <div class="result-container" *ngIf="resultado">
          <h3>Seu resultado</h3>
          <p class="imc-result" [ngClass]="classificacao">{{ resultado }}</p>
          <div class="imc-gauge">
            <div class="gauge-marker" [style.left]="getGaugePosition()"></div>
            <div class="gauge-labels">
              <span>Abaixo do peso</span>
              <span>Normal</span>
              <span>Sobrepeso</span>
              <span>Obesidade</span>
            </div>
          </div>
          <div class="tip-box" *ngIf="tip">
            <h4>Dica de saúde</h4>
            <p>{{ tip }}</p>
          </div>
        </div>
      </div>

      <!-- BMI Category Images with Risk Information -->
      <div class="bmi-categories">
        <h3>Categorias de IMC e seus Riscos</h3>

        <div class="category-card">
          <h4><span class="abaixo-peso">Abaixo do peso</span></h4>
          <div class="category-content">
            <div class="image-container">
              <img
                src="assets/images/underweight.jpg"
                alt="Pessoa abaixo do peso"
                class="category-image"
              />
            </div>
            <div class="category-info">
              <p><strong>IMC:</strong> < 18.5</p>
              <p>
                <strong>Riscos:</strong> Deficiência nutricional, sistema
                imunológico debilitado, fragilidade óssea, anemia e fadiga
                crônica. Pessoas muito abaixo do peso podem também enfrentar
                problemas hormonais e reprodutivos.
              </p>
            </div>
          </div>
        </div>

        <div class="category-card">
          <h4><span class="peso-normal">Peso normal</span></h4>
          <div class="category-content">
            <div class="image-container">
              <img
                src="assets/images/normal.jpg"
                alt="Pessoa com peso normal"
                class="category-image"
              />
            </div>
            <div class="category-info">
              <p><strong>IMC:</strong> 18.5 - 24.9</p>
              <p>
                <strong>Riscos:</strong> Menor risco de doenças
                cardiovasculares, diabetes tipo 2 e hipertensão. Esta faixa é
                associada à melhor expectativa de vida e bem-estar geral quando
                acompanhada de hábitos saudáveis.
              </p>
            </div>
          </div>
        </div>

        <div class="category-card">
          <h4><span class="sobrepeso">Sobrepeso</span></h4>
          <div class="category-content">
            <div class="image-container">
              <img
                src="assets/images/overweight.jpg"
                alt="Pessoa com sobrepeso"
                class="category-image"
              />
            </div>
            <div class="category-info">
              <p><strong>IMC:</strong> 25.0 - 29.9</p>
              <p>
                <strong>Riscos:</strong> Risco aumentado de doenças cardíacas,
                pressão alta, diabetes tipo 2, apneia do sono e problemas nas
                articulações. O sobrepeso pode também contribuir para
                dificuldades respiratórias e menor qualidade de vida.
              </p>
            </div>
          </div>
        </div>

        <div class="category-card">
          <h4><span class="obesidade">Obesidade</span></h4>
          <div class="category-content">
            <div class="image-container">
              <img
                src="assets/images/obese.jpg"
                alt="Pessoa com obesidade"
                class="category-image"
              />
            </div>
            <div class="category-info">
              <p><strong>IMC:</strong> ≥ 30.0</p>
              <p>
                <strong>Riscos:</strong> Alto risco de doenças cardiovasculares,
                AVC, diabetes tipo 2, diversos tipos de câncer, problemas
                articulares, apneia do sono e complicações respiratórias. A
                obesidade pode reduzir significativamente a expectativa de vida
                e impactar a saúde mental.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h3>O que é IMC?</h3>
        <p>
          O Índice de Massa Corporal (IMC) é uma medida internacional usada para
          avaliar a relação entre peso e altura de uma pessoa, calculado pela
          fórmula: peso (kg) ÷ altura² (m).
        </p>
        <h4>Classificações do IMC:</h4>
        <ul>
          <li><span class="abaixo-peso">Abaixo do peso: IMC < 18.5</span></li>
          <li>
            <span class="peso-normal">Peso normal: IMC entre 18.5 e 24.9</span>
          </li>
          <li>
            <span class="sobrepeso">Sobrepeso: IMC entre 25.0 e 29.9</span>
          </li>
          <li><span class="obesidade">Obesidade: IMC ≥ 30.0</span></li>
        </ul>
        <p class="disclaimer">
          O IMC é apenas uma referência e não substitui a avaliação de um
          profissional de saúde. Fatores como composição corporal, idade e
          particularidades individuais devem ser considerados.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      header {
        text-align: center;
        margin-bottom: 30px;
        padding: 15px;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        border-radius: 8px;
        color: white;
      }

      .subtitle {
        opacity: 0.9;
        font-weight: 300;
      }

      .card {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        padding: 30px;
        margin-bottom: 30px;
      }

      .calculator {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      label {
        margin-bottom: 8px;
        font-weight: 500;
        color: #555;
      }

      input {
        padding: 12px 15px;
        border: 2px solid #e1e1e1;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s;
      }

      input:focus {
        outline: none;
        border-color: #6e8efb;
        box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
      }

      input:invalid {
        border-color: #ff6b6b;
      }

      button {
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 14px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(110, 142, 251, 0.4);
      }

      button:active {
        transform: translateY(0);
      }

      .result-container {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 2px dashed #e1e1e1;
        animation: fadeIn 0.5s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .imc-result {
        font-size: 20px;
        font-weight: 700;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
        text-align: center;
      }

      .abaixo-peso {
        color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
      }

      .peso-normal {
        color: #2ecc71;
        background-color: rgba(46, 204, 113, 0.1);
      }

      .sobrepeso {
        color: #f39c12;
        background-color: rgba(243, 156, 18, 0.1);
      }

      .obesidade {
        color: #e74c3c;
        background-color: rgba(231, 76, 60, 0.1);
      }

      .imc-gauge {
        height: 30px;
        background: linear-gradient(
          to right,
          #3498db 0%,
          #3498db 25%,
          #2ecc71 25%,
          #2ecc71 50%,
          #f39c12 50%,
          #f39c12 75%,
          #e74c3c 75%,
          #e74c3c 100%
        );
        border-radius: 15px;
        margin: 30px 0 10px;
        position: relative;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .gauge-marker {
        position: absolute;
        width: 6px;
        height: 40px;
        background-color: #333;
        border-radius: 3px;
        top: -5px;
        transform: translateX(-3px);
        transition: left 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 2;
      }

      .gauge-marker::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: -4px;
        width: 14px;
        height: 14px;
        background-color: #333;
        border-radius: 50%;
      }

      .gauge-labels {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        font-size: 12px;
        font-weight: 600;
        margin-top: 15px;
        text-align: center;
      }

      .gauge-labels span:nth-child(1) {
        color: #3498db;
      }

      .gauge-labels span:nth-child(2) {
        color: #2ecc71;
      }

      .gauge-labels span:nth-child(3) {
        color: #f39c12;
      }

      .gauge-labels span:nth-child(4) {
        color: #e74c3c;
      }

      .gauge-values {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        font-size: 10px;
        color: #666;
        margin-bottom: 5px;
        padding: 0 3px;
      }

      .gauge-values span {
        position: relative;
      }

      .gauge-values span::before {
        content: "";
        position: absolute;
        height: 5px;
        width: 1px;
        background-color: #666;
        bottom: -8px;
        left: 50%;
      }

      .label-baixo,
      .label-normal,
      .label-sobre,
      .label-obeso {
        color: white;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
        margin: 5px 0;
      }

      .tip-box {
        background-color: #f8f9fa;
        border-left: 4px solid #6e8efb;
        padding: 15px;
        margin-top: 20px;
        border-radius: 4px;
      }

      .tip-box h4 {
        margin-bottom: 10px;
        color: #333;
      }

      .info-card {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        padding: 25px;
      }

      .info-card h3 {
        margin-bottom: 15px;
        color: #333;
      }

      .info-card h4 {
        margin: 20px 0 10px;
        color: #555;
      }

      .info-card ul {
        list-style-type: none;
        margin-left: 15px;
      }

      .info-card li {
        margin-bottom: 10px;
      }

      .disclaimer {
        font-style: italic;
        color: #777;
        font-size: 14px;
        margin-top: 20px;
      }

      @media (max-width: 600px) {
        .container {
          padding: 10px;
        }

        .card {
          padding: 20px;
        }
      }

      .bmi-categories {
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        padding: 30px;
        margin-bottom: 30px;
      }

      .bmi-categories h3 {
        margin-bottom: 20px;
        text-align: center;
        color: #333;
      }

      .category-card {
        margin-bottom: 25px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      .category-card h4 {
        padding: 12px;
        margin: 0;
        text-align: center;
      }

      .category-content {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 15px;
        background-color: #f9f9f9;
        gap: 20px;
      }

      .image-container {
        flex: 0 0 180px;
        height: 180px;
        overflow: hidden;
        border-radius: 8px;
      }

      .category-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .image-container:hover .category-image {
        transform: scale(1.05);
      }

      .category-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .category-info p {
        margin-bottom: 8px;
        font-size: 15px;
        line-height: 1.5;
      }

      @media (max-width: 767px) {
        .category-content {
          flex-direction: column;
          align-items: center;
        }

        .image-container {
          flex: 0 0 auto;
          width: 100%;
          max-width: 300px;
          height: 200px;
          margin-bottom: 15px;
        }
      }
    `,
  ],
})
export class AppComponent {
  resultado: string = "";
  classificacao: string = "";
  tip: string = "";
  imcValue: number = 0;

  calcularIMC() {
    const peso = parseFloat(
      (document.getElementById("peso") as HTMLInputElement).value
    );
    const altura = parseFloat(
      (document.getElementById("altura") as HTMLInputElement).value
    );

    if (!peso || !altura || peso <= 0 || altura <= 0 || altura > 3) {
      this.resultado = "Por favor, insira valores válidos.";
      this.classificacao = "";
      this.tip = "";
      return;
    }

    const imc = peso / (altura * altura);
    this.imcValue = parseFloat(imc.toFixed(2)); // Arredondar o IMC para 2 casas decimais

    if (this.imcValue < 18.5) {
      this.resultado = `IMC: ${this.imcValue} - Abaixo do peso`;
      this.classificacao = "abaixo-peso";
      this.tip =
        "Considere aumentar o consumo de alimentos nutrientes e proteínas. Consulte um nutricionista para um plano alimentar adequado.";
    } else if (this.imcValue >= 18.5 && this.imcValue <= 24.9) {
      this.resultado = `IMC: ${this.imcValue} - Peso normal`;
      this.classificacao = "peso-normal";
      this.tip =
        "Continue mantendo hábitos saudáveis com alimentação balanceada e atividade física regular.";
    } else if (this.imcValue >= 25.0 && this.imcValue <= 29.9) {
      this.resultado = `IMC: ${this.imcValue} - Sobrepeso`;
      this.classificacao = "sobrepeso";
      this.tip =
        "Considere aumentar a atividade física e fazer pequenos ajustes na alimentação. Consultar um profissional pode ajudar.";
    } else if (this.imcValue >= 30.0) {
      this.resultado = `IMC: ${this.imcValue} - Obesidade`;
      this.classificacao = "obesidade";
      this.tip =
        "Recomenda-se consultar um médico, nutricionista e educador físico para desenvolver um plano de saúde personalizado.";
    }
  }

  getGaugePosition(): string {
    if (!this.imcValue) return "0%";

    if (this.imcValue < 18.5) {
      // Posição na primeira seção (abaixo do peso)
      return `${(this.imcValue / 18.5) * 25}%`;
    } else if (this.imcValue <= 24.9) {
      // Posição na segunda seção (normal)
      return `${25 + ((this.imcValue - 18.5) / 6.4) * 25}%`;
    } else if (this.imcValue <= 29.9) {
      // Posição na terceira seção (sobrepeso)
      return `${50 + ((this.imcValue - 25) / 4.9) * 25}%`;
    } else {
      // Posição na quarta seção (obesidade)
      const position = 75 + ((this.imcValue - 30) / 10) * 25;
      return `${Math.min(position, 98)}%`;
    }
  }
}
