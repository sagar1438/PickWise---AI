from datetime import date

from sqlalchemy import Boolean, Date, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Provider(Base):
    __tablename__ = "providers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    website: Mapped[str | None] = mapped_column(String(255), nullable=True)
    logo: Mapped[str | None] = mapped_column(String(255), nullable=True)

    models: Mapped[list["Model"]] = relationship(
        back_populates="provider",
        cascade="all, delete-orphan",
    )


class Model(Base):
    __tablename__ = "models"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    provider_id: Mapped[int] = mapped_column(
        ForeignKey("providers.id"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    release_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    is_trending: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    provider: Mapped["Provider"] = relationship(back_populates="models")

    metrics: Mapped["ModelMetrics | None"] = relationship(
        back_populates="model",
        cascade="all, delete-orphan",
        uselist=False,
    )

    capabilities: Mapped["ModelCapabilities | None"] = relationship(
        back_populates="model",
        cascade="all, delete-orphan",
        uselist=False,
    )


class ModelMetrics(Base):
    __tablename__ = "model_metrics"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    model_id: Mapped[int] = mapped_column(
        ForeignKey("models.id"),
        nullable=False,
        unique=True,
    )
    cost_score: Mapped[float] = mapped_column(Float, nullable=False)
    speed_score: Mapped[float] = mapped_column(Float, nullable=False)
    quality_score: Mapped[float] = mapped_column(Float, nullable=False)
    reasoning_score: Mapped[float] = mapped_column(Float, nullable=False)
    coding_score: Mapped[float] = mapped_column(Float, nullable=False)

    model: Mapped["Model"] = relationship(back_populates="metrics")


